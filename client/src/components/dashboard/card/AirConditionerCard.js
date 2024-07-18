import React from 'react';

const AirConditionerCard = ({ device, fetchDevices }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{device.name}</h5>
        <p className="card-text">Type: {device.type}</p>
        <p className="card-text">Status: {device.status ? 'Active' : 'Inactive'}</p>
        <p className="card-text">Values: {device.values}</p>
        <p className="card-text">Mode: {device.mode}</p>
      </div>
    </div>
  );
};

export default AirConditionerCard;
