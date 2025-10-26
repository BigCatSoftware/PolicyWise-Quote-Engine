import React from 'react';
import './QuoteSkeleton.css';

const QuoteSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line text"></div>
      <div className="skeleton-line amount"></div>
      <div className="skeleton-line text small"></div>
      <div className="skeleton-line button"></div>
    </div>
  );
};

export default QuoteSkeleton;
