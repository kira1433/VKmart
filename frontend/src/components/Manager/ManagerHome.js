import React, { useState, useEffect, ReactDOM } from "react";
import Axios from "axios";
import { useOutletContext } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const ManagerHome = () => {
  const ax = Axios.create({
    baseURL: "http://localhost:8080/trans",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  });

  const [user, setUser] = useOutletContext();
  const [items, setItems] = useState([
    () => {
      const data = ax.get("/");
      console.log(data.data);
      return data.data;
    },
  ]);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const getTrans = async () => {
      const data = ax.get("/");
      setItems(data.data);
      console.log(items);
    };
    getTrans();
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
                        Transactions :
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
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Date</th>
                              <th>Seller</th>
                              <th>Buyer</th>
                              <th>Item</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => {
                              <tr key={item.no}>
                                <td>{item.date}</td>

                                <td>{item.buyer}</td>

                                <td>{item.seller}</td>

                                <td>{item.item}</td>
                              </tr>;
                            })}
                          </tbody>
                        </table>
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

export default ManagerHome;
