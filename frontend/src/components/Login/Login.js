import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../logo.svg";
import Modal from "@mui/material/Modal";
import Axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    id: 0,
    email: "",
    pswd: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [result, setResult] = useState(true);
  const onLoginClick = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/users",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    await ax
      .get("/check", {
        params: {
          id: user.id,
          pswd: user.pswd,
        },
      })
      .then((res) => {
        res.data === ""
          ? setResult(false)
          : window.open(`/` + res.data.type + "/" + res.data.id, "_self");
      });
  };
  const resetPassword = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/users",
      headers: { "Content-Type": "application/json" },
    });
    await ax
      .put("/change", null, {
        params: {
          email: user.email,
          pswd: user.pswd,
        },
      })
      .then((res) => console.log(res));
  };
  return (
    <main className="form-signin w-100 m-auto text-center">
      <form>
        <img className="m-2" src={logo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

        <div className="form-floating mt-4 mb-2 m-5">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(event) => {
              const temp = user;
              temp.id = event.target.value;
              setUser(temp);
            }}
          />
          <label htmlFor="floatingInput">User Id</label>
        </div>
        <div className="form-floating mt-2 mb-2 m-5">
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

        <div className="checkbox ms-5 m-2 float-start">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <br></br>
        <br></br>
        <div>
          <button
            type="button"
            className="w-75 btn btn-lg btn-primary"
            onClick={onLoginClick}
          >
            Login
          </button>
        </div>
        <div style={{ display: result ? "none" : "block" }}>
          <p className="text-danger fw-light m-3 mb-0">Login Failed !!</p>
        </div>
      </form>

      <Link onClick={openModal} className="mt-1">
        Forgot Password?
      </Link>
      <Modal open={modalIsOpen}>
        <div
          className="card text-center mx-auto mt-5"
          style={{ maxWidth: 300 }}F
        >
          <div className="card-header h5 text-white bg-primary">
            Password Reset
            <button
              onClick={closeModal}
              className="float-end btn btn-close btn-outline-light"
            >
            </button>
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your email address and your new password.
            </p>
            <form>
              <div className="form-floating m-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(event) => {
                    const temp = user;
                    temp.email = event.target.value;
                    setUser(temp);
                  }}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>

              <div className="form-floating m-2">
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
              <button
                type="button"
                onClick={resetPassword}
            
                className="btn btn-primary w-100"
              >
                Reset password
              </button>
            </form>
            <div className="d-flex justify-content-between mt-4">
              <Link onClick={closeModal}>Back to Login</Link>
              <Link to="/signIn">Register</Link>
            </div>
          </div>
        </div>
      </Modal>

      <div className="m-2">
        <p>
          Do Not Have Account? <Link to="/signIn">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
