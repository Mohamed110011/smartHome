import React from 'react';

const DeviceCard = ({ device }) => {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header">{device.name}</div>
      <div className="card-body text-primary">
        <p className="card-text">Type: {device.type}</p>
        <p className="card-text">Status: {device.status ? 'Active' : 'Inactive'}</p>
        <p className="card-text">Values: {device.values}</p>
        <p className="card-text">Mode: {device.mode}</p>
      </div>
    </div>
  );
};

export default DeviceCard;
