import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from '../card/DeviceCard';

// Fetches names, types, statuses, values, and modes of devices from the server and displays them in a list of cards on the page for maison_id
const Devices = () => {
  const { maison_id } = useParams();
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setDevices(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      {devices.map((device) => (
        <DeviceCard key={device.device_id} device={device} />
      ))}
    </div>
  );
};








  
export default Devices;