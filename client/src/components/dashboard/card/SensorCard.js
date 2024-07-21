import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';

const SensorCard = ({ device, fetchDevices }) => {
  const [status, setStatus] = useState(device.status);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [parsedValues, setParsedValues] = useState([]);
  const intervalRef = useRef(null);
  const timestampsRef = useRef(new Set());

  // Load values from localStorage
  useEffect(() => {
    const savedValues = localStorage.getItem(`sensorValues_${device.device_id}`);
    if (savedValues) {
      const values = JSON.parse(savedValues);
      setParsedValues(values);
      values.forEach(item => timestampsRef.current.add(item.timestamp));
    }
  }, [device.device_id]);

  // Save values to localStorage
  useEffect(() => {
    localStorage.setItem(`sensorValues_${device.device_id}`, JSON.stringify(parsedValues));
  }, [parsedValues, device.device_id]);

  // Fetch values from the server
  const fetchValues = async () => {
    try {
      const url = `http://localhost:5000/dashboard/devices/${device.device_id}/values`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure values is an array
      const valuesArray = Array.isArray(data.values) ? data.values : [];

      if (valuesArray.length > 0) {
        const newValues = valuesArray.filter(item => !timestampsRef.current.has(item.timestamp));

        if (newValues.length > 0) {
          setParsedValues(prevValues => [
            ...prevValues,
            ...newValues
          ]);

          newValues.forEach(item => {
            timestampsRef.current.add(item.timestamp);
          });
        }
      }
    } catch (error) {
      console.error('Error fetching values:', error);
    }
  };

  // Start or stop fetching values based on modal visibility
  useEffect(() => {
    if (showModal) {
      intervalRef.current = setInterval(fetchValues, 5000); // Fetch every 5 seconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [showModal]);

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

  const openModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const data = {
    labels: parsedValues.map(item => new Date(item.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Values over Time',
        data: parsedValues.map(item => item.value),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const cardStyle = {
    width: '18rem',
    margin: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    backgroundColor: status ? '#d4edda' : '#f8d7da',
    cursor: 'pointer',
  };

  return (
    <>
      <div className="card sensor-card" style={cardStyle} onClick={toggleStatus}>
        <div className="card-body sensor-card-body">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-thermometer-half fa-2x mr-3"></i>
            <h5 className="card-title mb-0">{device.name}</h5>
          </div>
          <p className="card-text"><strong>Type:</strong> {device.type}</p>
          <p className="card-text"><strong>Status:</strong> {status ? 'on' : 'off'}</p>
          {isLoading && <p>Updating...</p>}
          <Button variant="primary" onClick={openModal}>Show Graph</Button>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Values Over Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Line data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SensorCard;
