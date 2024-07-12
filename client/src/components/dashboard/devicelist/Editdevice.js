import React, { Fragment, useState } from "react";

const Editdevice = ({ device, setDevicesChange }) => {
  const [device_name, setDeviceName] = useState(device.device_name);
  const [device_type, setDeviceType] = useState(device.device_type);
  const [device_status, setDeviceStatus] = useState(device.device_status);

  // edit device function
  const updateDevice = async (e) => {
    e.preventDefault();
    try {
      const body = { device_name, device_type, device_status };
      await fetch(`http://localhost:5000/dashboard/devices/${device.device_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      setDevicesChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${device.device_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${device.device_id}`}
        onClick={() => {
          setDeviceName(device.device_name);
          setDeviceType(device.device_type);
          setDeviceStatus(device.device_status);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Device</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setDeviceName(device.device_name);
                  setDeviceType(device.device_type);
                  setDeviceStatus(device.device_status);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={device_name}
                onChange={(e) => setDeviceName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={device_type}
                onChange={(e) => setDeviceType(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={device_status}
                onChange={(e) => setDeviceStatus(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDevice(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setDeviceName(device.device_name);
                  setDeviceType(device.device_type);
                  setDeviceStatus(device.device_status);
                }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Editdevice;