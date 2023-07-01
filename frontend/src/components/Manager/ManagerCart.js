import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../logo.svg";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import { BASE_URL } from "../../URLs";

const ManagerCart = () => {
  const [user, setUser] = useOutletContext();
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [pswd, setPswd] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pur, setPur] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [it, setIt] = useState({
    code: 0,
    name: "",
    price: 0,
    qty: 0,
    time: 0,
    offer: 0,
    seller: user,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/220px-Hapus_Mango.jpg",
  });
  const getItems = async () => {
    const ax = Axios.create({
      baseURL: BASE_URL + "items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.post("/search/", user).then((res) => {
      setItems(res.data);
    });
  };
  useEffect(() => {
    getItems();
  }, []);

  const update = async (item) => {
    const ax = Axios.create({
      baseURL: BASE_URL + "items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.put("/update", item);
  };

  const dele = async (item) => {
    const ax = Axios.create({
      baseURL: BASE_URL + "items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.delete("/delete/" + item.code);
    getItems();
  };
  const purchase = async () => {
    const ax = Axios.create({
      baseURL: BASE_URL + "items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    setPur(true);

    ax.put("/add", it);
  };
  return (
    <section
      className="h-100 h-custom"
      style={{ "background-color": "#d2c9ff" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ "border-radius": "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Your Products
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {items.length} items
                        </h6>
                      </div>
                      <hr />
                      <br />

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(20rem, 1fr))",
                          gridGap: "1rem",
                          marginBlock: "1rem",
                          padding: "0 1rem",
                          justifyItems: "center",
                          alignItems: "center",
                        }}
                      >
                        {items.map((item) => {
                          return (
                            <div
                              key={item.code}
                              className="height d-flex justify-content-center align-items-center p-2"
                            >
                              <div className="card p-3">
                                <div className="d-flex justify-content-between align-items-center ">
                                  <div>
                                    <h4 className="text-uppercase">
                                      {item.seller.name}
                                    </h4>

                                    <div className="mt-3">
                                      <h1 className="main-heading m-2">
                                        {item.name}
                                      </h1>
                                      <div className="form-floating">
                                        <input
                                          type="number"
                                          value={item.price}
                                          className="form-control"
                                          id="floatingInput"
                                          disabled
                                        />
                                        <label htmlFor="floatingInput">
                                          Price
                                        </label>
                                      </div>

                                      <span className="d-flex justify-content-between align-items-center mb-2">
                                        Offer Available
                                      </span>
                                      <span className="d-flex justify-content-between align-items-center mb-2">
                                        Unlimited : {item.offer}% Off
                                      </span>
                                    </div>
                                  </div>
                                  <div className="image">
                                    <img src={item.image} width="200" />
                                  </div>
                                </div>
                                <br></br>
                                <div className="d-flex m-1">
                                  <div className="form-floating">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="floatingInput"
                                      value={item.qty}
                                      disabled
                                    />
                                    <label htmlFor="floatingInput">
                                      Quantity
                                    </label>
                                  </div>

                                  <button
                                    onClick={() => dele(item)}
                                    className="float-end btn btn-danger"
                                  >
                                    Remove Product
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <hr></hr>
                      <br></br>
                      <Link
                        onClick={openModal}
                        className="btn btn-outline-dark p-2 nav-link d-flex align-items-center"
                        data-abc="true"
                      >
                        Add new product
                      </Link>
                      <Modal open={modalIsOpen}>
                        <div
                          className="card text-center mx-auto mt-5"
                          style={{ maxWidth: 400 }}
                        >
                          <div className="card-header h5 text-white bg-dark">
                            Please confirm your Sale
                            <button
                              onClick={closeModal}
                              className="float-end btn btn-close btn-outline-light"
                            ></button>
                          </div>
                          <div className="card-body px-5">
                            {pur ? (
                              <div>
                                <p>Your sale has been confirmed.</p>
                                <p>Thank you for dealing with us!!</p>
                              </div>
                            ) : (
                              <>
                                <p className="card-text py-2">
                                  The amount from your sale will be sent to your
                                  phone number automatically.
                                </p>
                                <form>
                                  <div className="form-floating m-2">
                                    <input
                                      type="name"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        const temp = it;
                                        temp.name = event.target.value;
                                        setIt(it);
                                      }}
                                    />
                                    <label htmlFor="floatingPassword">
                                      Name
                                    </label>
                                  </div>
                                  <div className="form-floating m-2">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        const temp = it;
                                        temp.price = event.target.value;
                                        setIt(it);
                                      }}
                                    />
                                    <label htmlFor="floatingPassword">
                                      Price
                                    </label>
                                  </div>
                                  <div className="form-floating m-2">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        const temp = it;
                                        temp.qty = event.target.value;
                                        setIt(it);
                                      }}
                                    />
                                    <label htmlFor="floatingPassword">
                                      Quantity
                                    </label>
                                  </div>
                                  <div className="form-floating m-2">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        const temp = it;
                                        temp.offer = event.target.value;
                                        setIt(it);
                                      }}
                                    />
                                    <label htmlFor="floatingPassword">
                                      Offer
                                    </label>
                                  </div>
                                  <div className="form-floating m-2">
                                    <input
                                      type="name"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        const temp = it;
                                        temp.time = event.target.value;
                                        setIt(it);
                                      }}
                                    />
                                    <label htmlFor="floatingPassword">
                                      Delivery Time
                                    </label>
                                  </div>
                                  <div className="form-floating m-2">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="floatingPassword"
                                      placeholder="Password"
                                      onChange={(event) => {
                                        setPswd(event.target.value);
                                      }}
                                    />

                                    <label htmlFor="floatingPassword">
                                      Password
                                    </label>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-dark w-100"
                                    onClick={purchase}
                                  >
                                    Confirm Sale
                                  </button>
                                </form>
                              </>
                            )}

                            <div className="d-flex justify-content-between mt-4">
                              <Link to="./" onClick={closeModal}>
                                Back to Home
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagerCart;
