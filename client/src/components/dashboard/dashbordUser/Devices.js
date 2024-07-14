import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from '../card/DeviceCard';

const InputDeviceList = () => {
    const { maison_id } = useParams();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDevices = async () => {
        try {
          const response = await fetch(`/devices/${maison_id}`);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
          }
          const data = await response.json();
          console.log('Fetched devices:', data); // Debugging log
          setDevices(data);
        } catch (err) {
          console.error('Error fetching devices:', err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDevices();
    }, [maison_id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (devices.length === 0) {
      return <div>No devices found.</div>;
    }
  
    return (
      <div className="device-list">
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    );
  };
  
  export default InputDeviceList;