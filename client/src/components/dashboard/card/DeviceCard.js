import React from 'react';
import AirConditionerCard from './AirConditionerCard';
import SensorCard from './SensorCard';
import LampCard from './LampCard';
import CameraCard from './CameraCard';
import RefrigeratorCard from './RefrigeratorCard';
import RouterCard from './RouterCard';
import TelevisionCard from './TelevisionCard';
import MusicCard from './MusicCard';
import WashingMachineCard from './WashingMachineCard';
// Import other specific card components

const DeviceCard = ({ device, fetchDevices }) => {
  const renderCard = () => {
    switch (device.type) {
      case 'air_conditioner':
        return <AirConditionerCard device={device} fetchDevices={fetchDevices} />;
      case 'sensor':
        return <SensorCard device={device} fetchDevices={fetchDevices} />;
      case 'lamp':
        return <LampCard device={device} fetchDevices={fetchDevices} />;
      case 'camera':
        return <CameraCard device={device} fetchDevices={fetchDevices} />;  
      case 'refrigerator':
        return <RefrigeratorCard device={device} fetchDevices={fetchDevices} />; 
      case 'router':
        return <RouterCard device={device} fetchDevices={fetchDevices} />; 
      case 'television':
        return <TelevisionCard device={device} fetchDevices={fetchDevices} />;   
      case 'music_system':
        return <MusicCard device={device} fetchDevices={fetchDevices} />; 
      case 'washing_machine':
        return <WashingMachineCard device={device} fetchDevices={fetchDevices} />;
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
