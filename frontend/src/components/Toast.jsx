import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease',
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };

    switch (type) {
      case 'success':
        return { ...baseStyles, backgroundColor: '#10b981' };
      case 'error':
        return { ...baseStyles, backgroundColor: '#ef4444' };
      case 'warning':
        return { ...baseStyles, backgroundColor: '#f59e0b' };
      default:
        return { ...baseStyles, backgroundColor: '#3b82f6' };
    }
  };

  return (
    <div style={getToastStyles()}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            marginLeft: '10px',
            fontSize: '18px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
