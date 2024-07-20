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

  const updateStatusInDatabase = async (newStatus) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/dashboard/dashboard/devices/${device.device_id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedDevice = await response.json();
      setStatus(updatedDevice.status);
      setIsLoading(false);
      fetchDevices();
    } catch (error) {
      console.error('Error updating status:', error);
      setIsLoading(false);
    }
  };

  const updateModeInDatabase = async (newMode) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/dashboard/dashboard/devices/${device.device_id}/mode`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: newMode }),
      });

      if (!response.ok) {
        throw new Error('Failed to update mode');
      }

      const updatedDevice = await response.json();
      setMode(updatedDevice.mode);
      setIsLoading(false);
      fetchDevices();
    } catch (error) {
      console.error('Error updating mode:', error);
      setIsLoading(false);
    }
  };

  const toggleStatus = () => {
    const newStatus = !status;
    updateStatusInDatabase(newStatus);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    updateModeInDatabase(newMode);
  };

  const cardStyle = {
    width: '18rem',
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    backgroundColor: status ? '#d4edda' : '#f8d7da',
    position: 'relative',
  };

  const cardBodyStyle = {
    padding: '1rem',
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
    width: '40px',
    height: '24px',
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: status ? '#4CAF50' : '#ccc',
    transition: '.4s',
    borderRadius: '20px',
    boxShadow: 'none',
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    left: '2px',
    bottom: '2px',
    backgroundColor: 'white',
    transition: '.4s',
    transform: status ? 'translateX(16px)' : 'translateX(0)',
    boxShadow: 'none',
  };

  const darkPinkButtonStyle = {
    backgroundColor: '#FF8FAF', // Darker pink color
    color: 'white',
    borderColor: '#FF8FAF',
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
          <i className="fas fa-snowflake fa-2x mr-3"></i>
          <h5 className="card-title mb-0">{device.name}</h5>
        </div>
        <p className="card-text"><strong>Type:</strong> {device.type}</p>
        <p className="card-text"><strong>Status:</strong> {status ? 'Active' : 'Inactive'}</p>
        <p className="card-text"><strong>Values:</strong> {device.values}</p>
        <p className="card-text">
          <div className="btn-group mt-2 ml-5">
            <button
              type="button"
              className={`btn ${mode === 'cool' ? 'btn-success' : ''}`}
              style={mode !== 'cool' ? darkPinkButtonStyle : {}}
              onClick={() => handleModeChange('cool')}
            >
              <i className="fas fa-snowflake"></i>
            </button>
            <button
              type="button"
              className={`btn ${mode === 'heat' ? 'btn-success' : ''}`}
              style={mode !== 'heat' ? darkPinkButtonStyle : {}}
              onClick={() => handleModeChange('heat')}
            >
              <i className="fas fa-fire"></i>
            </button>
            <button
              type="button"
              className={`btn ${mode === 'fan' ? 'btn-success' : ''}`}
              style={mode !== 'fan' ? darkPinkButtonStyle : {}}
              onClick={() => handleModeChange('fan')}
            >
              <i className="fas fa-fan"></i>
            </button>
            <button
              type="button"
              className={`btn ${mode === 'auto' ? 'btn-success' : ''}`}
              style={mode !== 'auto' ? darkPinkButtonStyle : {}}
              onClick={() => handleModeChange('auto')}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </p>
        {isLoading && <p>Updating...</p>}
      </div>
    </div>
  );
};

export default AirConditionerCard;
