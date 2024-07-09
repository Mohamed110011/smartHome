import React, { Fragment, useState } from "react";

const EditMaison = ({ maison, setMaisonsChange }) => {
  const [description, setDescription] = useState(maison.description);
  const [address, setAddress] = useState(maison.address);

  // Function to handle the edit operation
  const editText = async (id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, address }; // Use current state of description and address

      await fetch(`http://localhost:5000/dashboard/maisons/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setMaisonsChange(true); // Trigger reload of maisons after edit

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* Button to trigger modal */}
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${maison.maison_id}`}
      >
        Edit
      </button>

      {/* Modal for editing */}
      <div className="modal" id={`id${maison.maison_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Maison</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(maison.description);
                  setAddress(maison.address);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="editDescription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="editDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="editAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => editText(maison.maison_id)} // Call edit function
                data-dismiss="modal"
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(maison.description);
                  setAddress(maison.address);
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

export default EditMaison;
