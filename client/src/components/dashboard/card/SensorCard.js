import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SensorCard = ({ device, fetchDevices }) => {
  const cardStyle = {
    width: '18rem',
    margin: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '10px'
  };

  const cardBodyStyle = {
    padding: '1rem'
  };

  const buttonStyle = {
    marginTop: '1rem'
  };

  return (
    <div className="card sensor-card">
      <div className="card-body sensor-card-body">
        <div className="d-flex align-items-center mb-3">
          <i className="fas fa-thermometer-half fa-2x mr-3"></i>
          <h5 className="card-title mb-0">{device.name}</h5>
        </div>
        <p className="card-text"><strong>Type:</strong> {device.type}</p>
        <p className="card-text"><strong>Status:</strong> {device.status ? 'on' : 'off'}</p>
        <p className="card-text"><strong>Values:</strong> {device.values}</p>
      </div>
    </div>
  );
};

export default SensorCard;
