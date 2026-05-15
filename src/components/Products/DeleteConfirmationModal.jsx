import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../Auth/AuthModal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content delete-confirm-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-form-container">
          <div className="auth-form">
            <div className="delete-icon-container">⚠️</div>
            <h2>Obriši proizvod?</h2>
            <p>Da li ste sigurni da želite da obrišete <strong>{productName}</strong>? Ova akcija je nepovratna.</p>
            
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={onClose}>Odustani</button>
              <button className="confirm-delete-btn" onClick={onConfirm}>Da, obriši</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .delete-confirm-content {
          max-width: 400px !important;
          text-align: center;
        }
        .delete-icon-container {
          font-size: 50px;
          margin-bottom: 15px;
        }
        .confirm-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 30px;
        }
        .cancel-btn {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: white;
          font-weight: 700;
          cursor: pointer;
        }
        .confirm-delete-btn {
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #d93025;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
        .confirm-delete-btn:hover {
          background: #b9261c;
        }
        @media (max-width: 320px) {
          .delete-confirm-content {
            max-width: 90% !important;
          }
          .confirm-actions {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .delete-icon-container {
            font-size: 40px;
          }
          h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default DeleteConfirmationModal;
