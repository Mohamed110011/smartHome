import React, { Fragment, useState } from "react";

const Editdevice = ({ device, fetchDevices }) => {
  const [name, setName] = useState(device.name);
  const [type, setType] = useState(device.type);
  const [status, setStatus] = useState(device.status);
  const [values, setValues] = useState(device.values);
  const [mode, setMode] = useState(device.mode);

  const shouldHideValues = () => {
    return type !== "air_conditioner" && type !== "sensor";
  };

  const shouldHideMode = () => {
    return type !== "air_conditioner";
  };

  // Function to update device information
  const updateDevice = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type, status, values, mode };
      const response = await fetch(`http://localhost:5000/dashboard/devices/${device.device_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      // Check response status or handle as needed
      if (response.ok) {
        console.log("Device updated successfully");
        fetchDevices(); // Refresh the device list
      } else {
        console.error("Failed to update device");
      }
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
          setName(device.name);
          setType(device.type);
          setStatus(device.status);
          setValues(device.values);
          setMode(device.mode);
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
                  setName(device.name);
                  setType(device.type);
                  setStatus(device.status);
                  setValues(device.values);
                  setMode(device.mode);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              {!shouldHideValues() && (
                <Fragment>
                  <label htmlFor="values">Values</label>
                  <input
                    type="text"
                    className="form-control"
                    id="values"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                  />
                </Fragment>
              )}
              {!shouldHideMode() && (
                <Fragment>
                  <label htmlFor="mode">Mode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  />
                </Fragment>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={updateDevice}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setName(device.name);
                  setType(device.type);
                  setStatus(device.status);
                  setValues(device.values);
                  setMode(device.mode);
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
