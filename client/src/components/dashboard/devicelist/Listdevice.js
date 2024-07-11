import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import EditDevices from "./Editdevice";

const Listdevice = ({ allDevices, setDevicesChange }) => {
  const [devices, setDevices] = useState([]);

  // delete device function
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
    setDevices(allDevices);
  }, [allDevices]);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Device Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {devices.length !== 0 &&
            devices[0].device_id !== null &&
            devices.map((device) => (
              <tr key={device.device_id}>
                <td>{device.device_id}</td>
                <td>{device.device_name}</td>
                <td>{device.device_type}</td>
                <td>{device.device_status}</td>
                <td>
                  <EditDevices device={device} setDevicesChange={setDevicesChange} />
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
            ))}
        </tbody>
      </table>
    </Fragment>
    
  );
};

export default Listdevice;
