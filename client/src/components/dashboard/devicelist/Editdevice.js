import React, { Fragment, useState } from "react";



// router.put("/devices/:id", authorization, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, type, status, values, mode } = req.body;
//     const updateDevice = await pool.query(
//       "UPDATE devices SET name = $1, type = $2, status = $3, values = $4, mode = $5 WHERE device_id = $6 RETURNING *",
//       [name, type, status, values, mode, id]
//     );

//     if (updateDevice.rows.length === 0) {
//       return res.json("This device does not exist");
//     }

//     res.json("Device was updated");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });





const Editdevice = ({ device }) => {
  const [name, setName] = useState(device.name);
  const [type, setType] = useState(device.type);
  const [status, setStatus] = useState(device.status);
  const [values, setValues] = useState(device.values);
  const [mode, setMode] = useState(device.mode);

  // edit device function
  const updateDevice = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type, status, values, mode };
      const response = await fetch(`http://localhost:5000/dashboard/devices/${device.device_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      console.log("Response:", response);
      window.location = `/devices/${device.maison_id}`;
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
              <input
                type="text"
                className="form-control my-2"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2"
                value={type}
                onChange={e => setType(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2"
                value={status}
                onChange={e => setStatus(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2"
                value={values}
                onChange={e => setValues(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2"
                value={mode}
                onChange={e => setMode(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDevice(e)}
              >
                Edit
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
}

export default Editdevice;
