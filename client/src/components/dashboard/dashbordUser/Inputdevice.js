import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Listdevice from "../devicelist/Listdevice";

const InputDeviceList = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [values, setValues] = useState("");
  const [mode, setMode] = useState("");
  const [devices, setDevices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState({});

  const { maison_id } = useParams();

  const fetchDevices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", token: localStorage.token }
      });
      const jsonData = await response.json();
      setDevices(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [refresh]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!type) newErrors.type = "Type is required.";
    if (!status) newErrors.status = "Status is required.";
    if (!shouldHideValues() && !values) newErrors.values = "Values are required.";
    if (!shouldHideMode() && !mode) newErrors.mode = "Mode is required.";
    return newErrors;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const body = { name, type, status, values, mode };
      await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      setRefresh((prev) => !prev);
      setName("");
      setType("");
      setStatus("");
      setValues("");
      setMode("");
      setErrors({});
    } catch (err) {
      console.error(err.message);
    }
  };

  const shouldHideValues = () => {
    return type !== "air_conditioner" && type !== "sensor";
  };

  const shouldHideMode = () => {
    return type !== "air_conditioner";
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Device</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <label htmlFor="name">Device Name</label>
        <input
          type="text"
          id="name"
          placeholder="Add name"
          className="form-control my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}
        <div className="form-group my-2">
          <label htmlFor="type">Device Type</label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="sensor">Sensor</option>
            <option value="lamp">Lamp</option>
            <option value="air_conditioner">Air Conditioner</option>
            <option value="camera">Camera</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="router">Router</option>
            <option value="television">Television</option>
            <option value="music_system">Music System</option>
            <option value="washing_machine">Washing Machine</option>
          </select>
          {errors.type && <span className="text-danger">{errors.type}</span>}
        </div>
        <div className="form-group my-2">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
          {errors.status && <span className="text-danger">{errors.status}</span>}
        </div>
        {!shouldHideValues() && (
          <div>
            <label htmlFor="values">Device Value</label>
            <input
              type="text"
              id="values"
              placeholder="Add value"
              className="form-control my-2"
              value={values}
              onChange={(e) => setValues(e.target.value)}
            />
            {errors.values && <span className="text-danger">{errors.values}</span>}
          </div>
        )}
        {!shouldHideMode() && (
          <div className="form-group my-2">
            <label htmlFor="mode">Device Mode</label>
            <select
              className="form-control"
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Select mode</option>
              <option value="cool">Cool</option>
              <option value="heat">Heat</option>
              <option value="fan">Fan</option>
              <option value="dry">Dry</option>
            </select>
            {errors.mode && <span className="text-danger">{errors.mode}</span>}
          </div>
        )}
        <button className="btn btn-success mt-2">Add</button>
      </form>
      <Listdevice devices={devices} fetchDevices={fetchDevices} />
    </Fragment>
  );
};

export default InputDeviceList;
