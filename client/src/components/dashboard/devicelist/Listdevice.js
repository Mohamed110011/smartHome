import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import Editdevice from "./Editdevice";

const Listdevice = ({ devices, fetchDevices }) => {
  const { maison_id } = useParams();

  const deleteDevice = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/devices/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      fetchDevices();
    } catch (err) {
      console.error(err.message);
    }
  };

  const shouldHideValues = (type) => {
    return type !== "air_conditioner" && type !== "sensor";
  };

  const shouldHideMode = (type) => {
    return type !== "air_conditioner";
  };

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
            <th>Device Mode</th>
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
                <td>{shouldHideValues(device.type) ? "-" : device.values}</td>
                <td>{shouldHideMode(device.type) ? "-" : device.mode}</td>
                <td>
                  <Editdevice device={device} fetchDevices={fetchDevices} />
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
              <td colSpan="7">No devices found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Listdevice;
