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
  const intervalRef = useRef(null); // Reference for the interval
  const lastValueRef = useRef(null); // Reference to the last value

  // Load values from localStorage
  useEffect(() => {
    const savedValues = localStorage.getItem(`sensorValues_${device.device_id}`);
    if (savedValues) {
      setParsedValues(JSON.parse(savedValues));
    }
  }, [device.device_id]);

  // Save values to localStorage
  useEffect(() => {
    localStorage.setItem(`sensorValues_${device.device_id}`, JSON.stringify(parsedValues));
  }, [parsedValues, device.device_id]);

  // Fetch values from the server
  const fetchValues = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/dashboard/devices/${device.device_id}/values`);
      if (!response.ok) {
        throw new Error('Failed to fetch values');
      }
      const data = await response.json();
      console.log('Fetched values:', data.values); // Log fetched values

      let valuesArray = [];

      if (Array.isArray(data.values)) {
        valuesArray = data.values;
      } else if (typeof data.values === 'number' || typeof data.values === 'string') {
        // Wrap single value in an array with a timestamp
        valuesArray = [{ timestamp: new Date().toISOString(), value: data.values }];
      } else {
        console.error('Fetched values are not in an expected format:', data.values);
        return; // Exit if the format is unexpected
      }

      // Process fetched values
      if (valuesArray.length > 0) {
        const firstValue = valuesArray[0].value;
        // Update state only if the new value is different from the last recorded value
        if (lastValueRef.current === null || firstValue !== lastValueRef.current) {
          lastValueRef.current = firstValue; // Update the last value reference
          setParsedValues(prevValues => [
            ...prevValues,
            { timestamp: new Date().toISOString(), value: firstValue }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching values:', error);
    }
  };

  // Start or stop fetching values based on modal visibility
  useEffect(() => {
    if (showModal) {
      fetchValues(); // Fetch initial values when opening modal
      intervalRef.current = setInterval(fetchValues, 5000); // Fetch every 5 seconds
    } else {
      clearInterval(intervalRef.current); // Clear interval when closing modal
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [showModal]);

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
      fetchDevices(); // Refresh the device list after update
    } catch (error) {
      console.error('Error updating status:', error);
      setIsLoading(false);
    }
  };

  const toggleStatus = () => {
    const newStatus = !status;
    updateStatusInDatabase(newStatus);
  };

  const openModal = () => setShowModal(true);
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
    backgroundColor: status ? '#d4edda' : '#f8d7da', // Green if on, red if off
    cursor: 'pointer', // Changes cursor to pointer to indicate clickable
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
          <Button variant="primary" onClick={(e) => { e.stopPropagation(); openModal(); }}>Show Graph</Button>
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
