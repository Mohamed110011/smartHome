import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editdevice from "./Editdevice";

const Listdevice = () => {
  const { maison_id } = useParams(); // Get maison_id from URL parameters
  const [devices, setDevices] = useState([]);

  // Fetch device data
  const fetchDevices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        headers: { token: localStorage.token }
      });
      const data = await response.json();
      setDevices(data);
      console.log("Fetched devices:", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete device function
  const deleteDevice = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/devices/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setDevices(devices.filter(device => device.device_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [maison_id]);

  return (
    <Fragment>
      <h1>Devices</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Device Status</th>
            <th>Device Value</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {devices && devices.length > 0 ? (
            devices.map((device) => (
              <tr key={device.device_id}>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.status ? "Active" : "Inactive"}</td>
                <td>{device.values}</td>
                <td>
                  <Editdevice device={device} setDevicesChange={fetchDevices} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDevice(device.device_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No devices found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Listdevice;
