import React, { useState, useEffect, ReactDOM } from "react";
import Axios from "axios";
import { useOutletContext } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const Home = () => {
  const [user, setUser] = useOutletContext();
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    const getItems = async () => {
      const data = await ax.get("/");
      setItems(data.data);
    };
    getItems();
  }, []);

  const update = async (item) => {
    const ax = Axios.create({
      baseURL: "http://localhost:8080/items",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    console.log(item);
    if (user.cart.find((e) => e.code === item.code) != undefined) {
      ax.put("../users/" + user.id + "/cart/update", item, {
        params: {
          count: qty,
        },
      });
    } else {
      ax.put("../users/" + user.id + "/cart/add", item, {
        params: {
          count: qty,
        },
      });
    }
  };
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="p-5 ">
                    <div>
                      <h1 className="fw-bold mb-0 text-black d-flex justify-content-between align-items-center ms-5">
                        Search Results :
                      </h1>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <br />
                      <div
                        className="card-grid mx-auto d-flex flex-row flex-wrap justify-content-center"
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
                                        Discounts Available*
                                      </span>
                                      <div className="d-flex m-1">
                                        <button
                                          type="button"
                                          id="sub"
                                          className="sub  btn"
                                          onClick={() =>
                                            qty > 1 ? setQty(qty - 1) : null
                                          }
                                        >
                                          -
                                        </button>
                                        <input
                                          className="count form-control"
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
                                          onClick={() =>
                                            qty < item.qty
                                              ? setQty(qty + 1)
                                              : null
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="image">
                                    <img src={item.image} width="200" />
                                  </div>
                                </div>
                                <br></br>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => update(item)}
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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

export default Home;
