import React from 'react';
import PropTypes from 'prop-types';
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

DeviceCard.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    values: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceCard;
