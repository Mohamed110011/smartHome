import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditUser from "./EditUsers";

const ListUsers = ({ allUsers, setUsersChange }) => {
  const [users, setUsers] = useState([]);

  // Function to delete a user
  async function deleteUser(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/users/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setUsers(users.filter(user => user.user_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>
                  <EditUser user={user} setUsersChange={setUsersChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/users/${user.user_id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUsers;
