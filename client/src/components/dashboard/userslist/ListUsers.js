import React, { Fragment, useEffect, useState } from "react";

const ListUsers = ({ allUsers, setUsersChange }) => {
  const [users, setUsers] = useState([]);

  // Function to delete a user
  async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/users/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });
      console.log("Deleting user with ID:", id);

      if (response.ok) {
        // Update local state after successful deletion
        setUsers(users.filter(user => user.user_id !== id));
        // Optionally, notify parent component of user change
        if (setUsersChange) {
          setUsersChange(users.filter(user => user.user_id !== id));
        }
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      console.error(err.message);
      // Handle error (e.g., show error message)
    }
  }

  useEffect(() => {
    // Update users state when allUsers prop changes
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 &&
            users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.user_id)}
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

export default ListUsers;
