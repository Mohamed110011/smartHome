import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import EditMaison from "./EditMaison";

const ListMaisons = ({ allMaisons, setMaisonsChange }) => {
  const [maisons, setMaisons] = useState([]);

  // delete maison function
  async function deleteMaison(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/maisons/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setMaisons(maisons.filter(maison => maison.maison_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setMaisons(allMaisons);
  }, [allMaisons]);

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th> {/* Add View column */}
          </tr>
        </thead>
        <tbody>
          {maisons.length !== 0 &&
            maisons[0].maison_id !== null &&
            maisons.map(maison => (
              <tr key={maison.maison_id}>
                <td>{maison.description}</td>
                <td>{maison.address}</td>
                <td>
                  <EditMaison maison={maison} setMaisonsChange={setMaisonsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMaison(maison.maison_id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/devices/${maison.maison_id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListMaisons;
