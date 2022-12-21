import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import logo from "../../logo.svg";
import Modal from "@mui/material/Modal";
import Axios from "axios";

const Cart = () => {
  const [user, setUser] = useOutletContext();
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);
  const [pswd, setPswd] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pur,setPur]=useState(false)
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const getPrice = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.get("../users/" + user.id + "/cart/total").then((res) => {
      setPrice(res.data);
    });
  };
  const getTime = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.get("../users/" + user.id + "/cart/estimate").then((res) => {
      setTime(res.data);
    });
  };
  const update = async (item) => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.put("../users/" + user.id + "/cart/update", item, {
      params: {
        count: qty,
      },
    });
  };
  const dele = async (item) => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });

    ax.put("../users/" + user.id + "/cart/remove", item).then((res) =>
      setUser(res.data)
    );
  };
  const purchase = async () => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    setPur(true);
    user.cart.map((item) => {
      ax.put("../trans/add", {
        date: new Date(),
        buyer:  user,
        seller: item.seller,
        item: item,
      });
    });

    ax.delete("../users/" + user.id + "/cart/buy").then((res) =>
      setUser(res.data)
    );
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
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {user.cart.length} items
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
                        {user.cart.map((item) => {
                          return (
                            <div
                              key={item.code}
                              className="height d-flex justify-content-center align-items-center p-2"
                            >
                              <div className="card p-3">
                                <div className="d-flex justify-content-between align-items-center ">
                                  <div>
                                    <h4 className="text-uppercase">{item.seller.name}</h4>

                                    <div className="mt-3">
                                      <h1 className="main-heading m-2">
                                        {item.name}
                                      </h1>
                                      <h2 className="text-uppercase m-2">
                                        {" "}
                                        ₹{item.price}
                                      </h2>

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
                                  <span className="d-flex m-1">
                                    <button
                                      type="button"
                                      id="sub"
                                      className="sub  btn"
                                      onClick={() => {
                                        const f =
                                          qty > 1 ? setQty(qty - 1) : null;
                                        update(item);
                                        return;
                                      }}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="count form-control form-control-sm"
                                      type="number"
                                      value={qty}
                                      id="1"
                                      min="1"
                                      max={item.qty}
                                      onChange={(e) => {
                                        setQty(e.target.value);
                                      }}
                                    />
                                    <button
                                      type="button"
                                      id="add"
                                      className="add me-1  btn "
                                      onClick={() => {
                                        const f =
                                          qty < item.qty
                                            ? setQty(qty + 1)
                                            : null;

                                        update(item);
                                        return;
                                      }}
                                    >
                                      +
                                    </button>
                                  </span>
                                  <span>
                                    <button
                                      onClick={() => dele(item)}
                                      className="float-end btn btn-danger"
                                    >
                                      Remove from Cart
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <hr></hr>
                      <div>
                        <Link
                          className="nav-link d-flex align-items-center"
                          data-abc="true"
                          onClick={getPrice}
                        >
                          Request for Price estimation
                        </Link>
                        <span> Total Price : {price} </span>
                      </div>
                      <br></br>
                      <div>
                        <Link
                          className="nav-link d-flex align-items-center"
                          data-abc="true"
                          onClick={getTime}
                        >
                          Request for Delivery estimation
                        </Link>
                        <span> Expected Time for Delivery : {time} days</span>
                      </div>
                      <br></br>
                      <Link
                        onClick={openModal}
                        className="btn btn-outline-dark p-2 nav-link d-flex align-items-center"
                        data-abc="true"
                      >
                        Place Order
                      </Link>
                      <Modal open={modalIsOpen}>
                        <div
                          className="card text-center mx-auto mt-5"
                          style={{ maxWidth: 400 }}
                        >
                          <div className="card-header h5 text-white bg-dark">
                            Please confirm your purchase
                            <button
                              onClick={closeModal}
                              className="float-end btn btn-close btn-outline-light"
                            ></button>
                          </div>
                          <div className="card-body px-5">
                            
                            {pur?
                            <div><p>Your purchase has been confirmed.
                            </p>
                            <p>Expected Time for Delivery : {time} days.</p>
                            <p>Thank you for shopping with us!!</p>
                              
                              </div>
                            :<><p className="card-text py-2">
                            Enter your password to confirm your purchase and
                            amount will be automatically deducted from your
                            wallet.
                          </p>
                            <form>
                              <div className="form-floating m-2">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="name@example.com"
                                  value={user.balance}
                                  disabled={true}
                                />
                                <label htmlFor="floatingInput">
                                  Your Balance
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
                                disabled={
                                  pswd != user.pswd || user.balance < price
                                }
                              >
                                Confirm purchase
                              </button>
                            </form>
                            </>
                            }
                            
                            <div className="d-flex justify-content-between mt-4">
                              <Link to="../" onClick={closeModal}>
                                Back to Home
                              </Link>
                              <Link to="./cart" onClick={closeModal}>
                                Go to Cart
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

export default Cart;
