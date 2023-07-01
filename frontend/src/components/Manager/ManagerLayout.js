import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../../logo.svg";
import cart from "../../cart.svg";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../../URLs";

const ManagerLayout = () => {
  let { id } = useParams();
  const [user, setUser] = useState({
    id: id,
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [search, setSearch] = useState("");
  const [pswd,setPswd] = useState("");
  const [bal,setBal] = useState(1000);
  useEffect(() => {
    const ax = Axios.create({
      baseURL: BASE_URL + "users",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    const getUser = async () => {
      const data = await ax.get("/" + id);
      setUser(data.data);
      //console.log(data.data)
    };
    getUser();
  },[]);
    const addBalance = () => {
      const ax = Axios.create({
        baseURL: BASE_URL + "users",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
      ax.put("/"+id+"/balance",{},{
        params:{
          balance:bal
        }
      });
    }
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav d-none d-md-flex mr-auto">
            <li className="nav-item">
              {" "}
              <span className="nav-link" data-abc="true">
                Hi,
              </span>
            </li>
            <li className="nav-item">
              {" "}
              <Link className="nav-link" data-abc="true">
                <span>{user.name}</span>
              </Link>{" "}
            </li>
          </ul>
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link d-flex align-items-center"
                data-abc="true"
              >
                <span>Sign Out</span>
              </Link>
            </li>

            
          </ul>
        </div>
      </nav>
      <Modal open={modalIsOpen}>
        <div
          className="card text-center mx-auto mt-5"
          style={{ maxWidth: 500}}
        >
          <div className="card-header h5 text-white bg-dark">
            Add Money to Wallet
            <button
              onClick={closeModal}
              className="float-end btn btn-close btn-outline-light"
            ></button>
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter required Balance and your password and we will send a request to your Phone Number.
            </p>
            <form>
              <div className="form-floating m-2">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={bal}
                  min="1000"
                  max="200000"
                  onChange={(event) => {
                    setBal(event.target.value)
                  }}
                />
                <label htmlFor="floatingInput">Amount</label>
              </div>

              <div className="form-floating m-2">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => {
                    setPswd(event.target.value)
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100"
                onClick={addBalance}
                disabled={pswd!=user.pswd || bal<1000}
              >
                Add Money
              </button>
            </form>
            <div className="d-flex justify-content-between mt-4">
              <Link to='./' onClick={closeModal}>Back to Home</Link>
              <Link to="./cart" onClick={closeModal}>Go to Cart</Link>
            </div>
          </div>
        </div>
      </Modal>

      <section className="header-main border-bottom bg-white">
        <div className="container-fluid ">
          <div className=" pt-3 pb-3 d-flex justify-content-between">
            <div className="p-2">
              <Link to="./" onClick={window.location.reload}>
                <img className=" " src={logo} alt="" width="72" height="57" />
              </Link>
            </div>
            <div className="p-2 ps-5 pe-5 flex-fill">
              <div className="form-inputs">
                <div className="input-group">
                  <div className="form-floating">
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      width="200hv"
                      placeholder="Search for Items..."
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                    />
                    <label htmlFor="name">Search</label>
                  </div>
                  <button
                    id="search-button"
                    type="button"
                    className="btn btn-dark p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Link to="./cart" onClick={window.location.reload}>
                <img className=" " src={cart} alt="" width="72" height="52" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Outlet context={[user, setUser]} />
    </>
  );
};

export default ManagerLayout;
