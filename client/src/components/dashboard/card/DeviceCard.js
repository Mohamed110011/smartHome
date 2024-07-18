import React from 'react';
import AirConditionerCard from './AirConditionerCard';
import SensorCard from './SensorCard';
// Import other specific card components

const DeviceCard = ({ device, fetchDevices }) => {
  const renderCard = () => {
    switch (device.type) {
      case 'air_conditioner':
        return <AirConditionerCard device={device} fetchDevices={fetchDevices} />;
      case 'sensor':
        return <SensorCard device={device} fetchDevices={fetchDevices} />;
      // Add cases for other device types
      default:
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
    }
  };

  return renderCard();
};

export default DeviceCard;
