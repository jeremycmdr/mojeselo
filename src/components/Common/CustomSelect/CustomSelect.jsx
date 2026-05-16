import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './CustomSelect.css';

const CustomSelect = ({ value, onChange, options, placeholder, hasError, openUpward }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const updatePosition = () => {
      if (triggerRef.current && isOpen) {
        const rect = triggerRef.current.getBoundingClientRect();
        
        if (openUpward) {
          // Pozicioniranje iznad tastera
          setDropdownPos({
            bottom: (window.innerHeight - rect.top) + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            isUp: true
          });
        } else {
          // Standardno pozicioniranje ispod tastera
          setDropdownPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            isUp: false
          });
        }
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, openUpward]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Helper to render options (handles both flat array and grouped options)
  const renderOptions = () => {
    return options.map((item, index) => {
      if (typeof item === 'object' && item.options) {
        // Grouped options
        return (
          <div key={item.label || index} className="optgroup-container">
            <div className="optgroup-label">{item.label}</div>
            {item.options.map((opt, optIndex) => {
              const optValue = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? opt.label : opt;
              return (
                <div 
                  key={optValue || optIndex}
                  className={`custom-option ${value === optValue ? 'selected' : ''}`}
                  onClick={() => handleSelect(optValue)}
                >
                  {optLabel}
                </div>
              );
            })}
          </div>
        );
      } else {
        // Simple option
        const optValue = typeof item === 'object' ? item.value : item;
        const optLabel = typeof item === 'object' ? item.label : item;
        return (
          <div 
            key={optValue}
            className={`custom-option ${value === optValue ? 'selected' : ''}`}
            onClick={() => handleSelect(optValue)}
          >
            {optLabel}
          </div>
        );
      }
    });
  };

  const getSelectedLabel = () => {
    if (!value) return placeholder;
    
    // Tražimo opciju koja odgovara trenutnoj vrednosti
    for (const item of options) {
      if (typeof item === 'object') {
        if (item.options) {
          const subOpt = item.options.find(o => (typeof o === 'object' ? o.value : o) === value);
          if (subOpt) return typeof subOpt === 'object' ? subOpt.label : subOpt;
        } else if (item.value === value) {
          return item.label;
        }
      } else if (item === value) {
        return item;
      }
    }
    return value;
  };

  return (
    <div className={`custom-select-container ${hasError ? 'has-error' : ''}`}>
      <button 
        ref={triggerRef}
        type="button"
        className={`custom-select-trigger ${isOpen ? 'active' : ''} ${openUpward ? 'upward' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-value">{getSelectedLabel()}</span>
        <span className="arrow-icon">▼</span>
      </button>

      {isOpen && createPortal(
        <div 
          className={`custom-options-dropdown ${dropdownPos.isUp ? 'is-upward' : ''}`} 
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: dropdownPos.isUp ? 'auto' : `${dropdownPos.top}px`,
            bottom: dropdownPos.isUp ? `${dropdownPos.bottom}px` : 'auto',
            left: `${dropdownPos.left}px`,
            width: `${dropdownPos.width}px`,
            zIndex: 9999
          }}
        >
          {renderOptions()}
        </div>,
        document.body
      )}
    </div>
  );
};

export default CustomSelect;
