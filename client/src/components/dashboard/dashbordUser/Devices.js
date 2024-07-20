import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeviceCard from '../card/DeviceCard';
import SearchBar from '../../SearchBar'; // Assurez-vous que le chemin est correct

const Devices = () => {
  const { maison_id } = useParams();
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // get description of the house
  const [houseName, setHouseName] = useState('');
  const getHouseName = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/house/${maison_id}`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setHouseName(parseData.description);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getHouseName();
  }
  , [maison_id]);



  
  const getDevices = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setDevices(parseData);
      setFilteredDevices(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDevices();
  }, [maison_id]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredDevices(
      devices.filter(device =>
        device.name.toLowerCase().includes(query.toLowerCase()) ||
        device.type.toLowerCase().includes(query.toLowerCase()) ||
        device.status.toString().toLowerCase().includes(query.toLowerCase()) ||
        device.values.toString().toLowerCase().includes(query.toLowerCase()) ||
        device.mode.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">
         {houseName} - Devices
      </h2>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <div key={device.device_id} className="col-lg-4 col-md-6 mb-4">
              <DeviceCard device={device} fetchDevices={getDevices} />
            </div>
          ))
        ) : (
          <p>Aucun appareil trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Devices;
