import React from 'react';
import './NewsWidget.css';

const NewsWidget = () => {
  return (
    <div className="news-widget">
      <h3 className="news-title">NAJNOVIJE VIJESTI SA SELA</h3>
      
      <div className="news-item">
        <p>Najnovije vijesti sa sela uvozi ovaj neuydirodit sa sela</p>
      </div>
      
      <div className="news-item">
        <p>Najnovinstva tereći tirsniju sa sela</p>
      </div>
      
      <div className="news-item">
        <p>Najnovije vijesti - domaćinstva Bosnu i Hercegovinu</p>
      </div>
    </div>
  );
};

export default NewsWidget;
