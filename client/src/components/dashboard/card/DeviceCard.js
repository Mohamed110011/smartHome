import React from 'react';
import './DeviceCard.css';

const DeviceCard = ({ device }) => {
  return (
    <div className="device-card">
      <h3>{device.name}</h3>
      <p>Type: {device.type}</p>
      <p>Status: {device.status}</p>
      <p>Values: {device.values}</p>
      <p>Mode: {device.mode}</p>
    </div>
  );
};

export default DeviceCard;
