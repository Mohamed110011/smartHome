import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const MusicCard = ({ device, fetchDevices }) => {
  const [status, setStatus] = useState(device.status);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatusInDatabase = async (newStatus) => {
    try {
      setIsLoading(true);
      console.log(`Sending PUT request to update status to: ${newStatus} for device ID: ${device.device_id}`);
      const response = await fetch(`http://localhost:5000/dashboard/dashboard/devices/${device.device_id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedDevice = await response.json();
      console.log('Received updated device:', updatedDevice);
      setStatus(updatedDevice.status);
      setIsLoading(false);
      fetchDevices(); // Refresh the device list after update
    } catch (error) {
      console.error('Error updating status:', error);
      setIsLoading(false);
    }
  };

  const toggleStatus = () => {
    const newStatus = !status;
    console.log(`Toggling status from ${status} to ${newStatus}`);
    updateStatusInDatabase(newStatus);
  };

  const cardStyle = {
    width: '18rem',
    margin: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    backgroundColor: status ? '#d4edda' : '#f8d7da', // Green if on, red if off
    cursor: 'pointer' // Changes cursor to pointer to indicate clickable
  };

  const cardBodyStyle = {
    padding: '1rem'
  };

  return (
    <div className="card sensor-card" style={cardStyle} onClick={toggleStatus}>
      <div className="card-body sensor-card-body" style={cardBodyStyle}>
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon icon={faMusic} size="2x" className="mr-3" />
          <h5 className="card-title mb-0">{device.name}</h5>
        </div>
        <p className="card-text"><strong>Type:</strong> {device.type}</p>
        <p className="card-text"><strong>Status:</strong> {status ? 'on' : 'off'}</p>
        {isLoading && <p>Updating...</p>}
      </div>
    </div>
  );
};

export default MusicCard;
