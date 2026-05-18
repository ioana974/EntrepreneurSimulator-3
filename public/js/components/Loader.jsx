import React, { useState, useEffect } from 'react';

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <div 
          className="progress-bar" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
        <div className="percentage">{Math.min(Math.floor(progress), 100)}%</div>
      </div>
    </div>
  );
}

export default Loader;
