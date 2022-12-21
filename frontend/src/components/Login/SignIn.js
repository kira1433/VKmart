import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import logo from "../../logo.svg";
import Axios from "axios";
const SignIn = () => {
  const [user, setUser] = useState({
    id: 0,
    balance: 0,
    type: "C",
    name: "",
    email: "",
    address: "",
    phno: "",
    pswd: "",
    cart: [],
    qty: [],
  });

  const [flag1, setFlag1] = useState("none");

  const onSignInClick = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/users",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.put("/add", user).then((res) => {
      res.data ? window.open(`/`, "_self") : window.open(`/signin`, "_self");
    });
  };

  return (
    <main className="form-signin w-100 m-auto text-center">
      <form className="row gy-2 gx-3 m-5 align-items-center">
        <img className="m-2" src={logo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Register new User Account</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={(event) => {
              const temp = user;
              temp.email = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="name"
            className="form-control"
            id="name"
            placeholder="Rishabh"
            onChange={(event) => {
              const temp = user;
              temp.name = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="name">Username</label>
        </div>
        <div className="col-5">
          <label className="visually-hidden" htmlFor="autoSizingInputGroup">
            @{user.id}
          </label>
          <div className="input-group">
            <div className="input-group-text">UserID</div>
            <input
              type="text"
              className="form-control"
              id="no"
              placeholder="@"
              disabled={true}
            />
          </div>
        </div>
        <div className="col-7">
          <label className="visually-hidden" htmlFor="autoSizingSelect">
            Preference
          </label>
          <select
            className="form-select"
            id="autoSizingSelect"
            onChange={(event) => {
              const temp = user;
              temp.type =
                event.target.value === "1"
                  ? "C"
                  : event.target.value === "2"
                  ? "M"
                  : event.target.value === "3"
                  ? "A"
                  : "\0";
              setUser(temp);
              console.log(user);
            }}
          >
            <option defaultValue="1">Customer</option>
            <option value="2">Manager</option>
            <option value="3" disabled={true}>
              Admin
            </option>
          </select>
        </div>
        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="+91"
            onChange={(event) => {
              const temp = user;
              temp.phno = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="floatingInput">Phone Number</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(event) => {
              const temp = user;
              temp.pswd = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="checkPassword"
            placeholder="Password"
            onChange={(event) => {
              if (event.target.value !== user.pswd) setFlag1("inline");
              else setFlag1("none");
            }}
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <label
          style={{ display: flag1 }}
          className="text-danger fw-light text-start m-0 ms-2"
        >
          Passwords must be same !!
        </label>
        <div className="form-floating">
          <input
            type="address"
            className="form-control"
            id="address"
            placeholder="Hyderabad"
            onChange={(event) => {
              const temp = user;
              temp.address = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="checkbox m-2 float-start">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <div className="m-2">
          <span className="float-start">
            <Link to="/">Already Have Account?</Link>
          </span>

          <button
            type="button"
            className="btn btn-primary float-end"
            style={{ inline: "true" }}
            onClick={onSignInClick}
            disabled={
              flag1 === "inline" ||
              user.email === "" ||
              user.name === "" ||
              user.pswd === ""
            }
          >
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
