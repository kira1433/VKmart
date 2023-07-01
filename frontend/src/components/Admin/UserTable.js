import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../URLs";

const UserTable = () => {
  const getCustomerRow = () => {
    return Users.map((user, index) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{getPhoneToRender(user.phno)}</td>
          <td>{user.type}</td>
          <td>{user.address}</td>
        </tr>
      );
    });
  };

  const getPhoneToRender = (phone) => {
    return phone ? (
      phone
    ) : (
      <div className="bg-warning p-0 text-center">No Phone</div>
    );
  };

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const ax = Axios.create({
      baseURL: BASE_URL + "users",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    const getUser = async () => {
      const data = await ax.get("/");
      setUsers(data.data);
      console.log(data.data);
    };
    getUser();
  }, []);

  return (
    <div>
      <h4 className="m-1 p-1">
        Customers List
        <span className="badge m-2 bg-dark">{Users.length}</span>
      </h4>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>{getCustomerRow()}</tbody>
      </table>
    </div>
  );
};

export default UserTable;
