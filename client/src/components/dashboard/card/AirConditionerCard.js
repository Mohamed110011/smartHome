import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AirConditionerCard = ({ device, fetchDevices }) => {
  const [status, setStatus] = useState(device.status);
  const [mode, setMode] = useState(device.mode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatus(device.status);
    setMode(device.mode);
  }, [device.status, device.mode]);

  // Fonction pour mettre à jour le status dans la base de données
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

  // Fonction pour mettre à jour le mode dans la base de données
  const updateModeInDatabase = async (newMode) => {
    try {
      setIsLoading(true);
      console.log(`Sending PUT request to update mode to: ${newMode} for device ID: ${device.device_id}`);
      const response = await fetch(`http://localhost:5000/dashboard/dashboard/devices/${device.device_id}/mode`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: newMode }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to update mode');
      }

      const updatedDevice = await response.json();
      console.log('Received updated device:', updatedDevice);
      setMode(updatedDevice.mode);
      setIsLoading(false);
      fetchDevices(); // Refresh the device list after update
    } catch (error) {
      console.error('Error updating mode:', error);
      setIsLoading(false);
    }
  };

  // Fonction pour basculer le status
  const toggleStatus = () => {
    const newStatus = !status;
    console.log(`Toggling status from ${status} to ${newStatus}`);
    updateStatusInDatabase(newStatus);
  };

  // Fonction pour gérer le changement de mode
  const handleModeChange = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic
    const newMode = event.target.value;
    setMode(newMode);
    updateModeInDatabase(newMode);
  };

  const cardStyle = {
    width: '18rem',
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    backgroundColor: status ? '#d4edda' : '#f8d7da', // Green if on, red if off
    position: 'relative', // Ensure the card is the relative reference for the toggle switch
  };

  const cardBodyStyle = {
    padding: '1rem'
  };

  const switchContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  };

  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '40px',  // Smaller width
    height: '24px', // Smaller height
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: status ? '#4CAF50' : '#ccc', // Green if on, grey if off
    transition: '.4s',
    borderRadius: '20px', // Smaller radius for a sleeker look
    boxShadow: 'none', // Remove shadow
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '20px', // Smaller height
    width: '20px',  // Smaller width
    borderRadius: '50%',
    left: '2px',    // Adjusted for smaller size
    bottom: '2px',  // Adjusted for smaller size
    backgroundColor: 'white',
    transition: '.4s',
    transform: status ? 'translateX(16px)' : 'translateX(0)', // Adjusted for smaller size
    boxShadow: 'none', // Remove shadow
  };

  return (
    <div className="card air-conditioner-card" style={cardStyle}>
      <div style={switchContainerStyle}>
        <label className="switch" style={switchStyle}>
          <input type="checkbox" checked={status} onChange={toggleStatus} />
          <span className="slider round" style={sliderStyle}>
            <span style={sliderBeforeStyle}></span>
          </span>
        </label>
      </div>
      <div className="card-body air-conditioner-card-body" style={cardBodyStyle}>
        <div className="d-flex align-items-center mb-3">
          <i className="fas fa-snowflake fa-2x mr-3"></i> {/* Icône de climatiseur */}
          <h5 className="card-title mb-0">{device.name}</h5>
        </div>
        <p className="card-text"><strong>Type:</strong> {device.type}</p>
        <p className="card-text"><strong>Status:</strong> {status ? 'Active' : 'Inactive'}</p>
        <p className="card-text"><strong>Values:</strong> {device.values}</p>
        <p className="card-text">
          <strong>Mode:</strong>
          <select value={mode} onChange={handleModeChange} className="form-select mt-2">
            <option value="cool">Cool</option>
            <option value="heat">Heat</option>
            <option value="fan">Fan</option>
            <option value="auto">Auto</option>
          </select>
        </p>
        {isLoading && <p>Updating...</p>}
      </div>
    </div>
  );
};

export default AirConditionerCard;
