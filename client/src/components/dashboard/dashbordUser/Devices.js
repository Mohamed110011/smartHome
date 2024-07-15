import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from '../card/DeviceCard';

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
    <div className="container">
      <div className="row">
        {devices.map((device) => (
          <div key={device.device_id} className="col-lg-4 col-md-6 mb-4">
            <DeviceCard device={device} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
