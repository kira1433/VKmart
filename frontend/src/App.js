import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import CustomerLayout from "./components/Customer/CustomerLayout";
import Home from "./components/Customer/Home";
import ManagerLayout from "./components/Manager/ManagerLayout";
import ManagerHome from "./components/Manager/ManagerHome";
import ManagerCart from "./components/Manager/ManagerCart";
import Contact from "./components/Customer/Contact";
import NoPage from "./components/NoPage";
import Login from "./components/Login/Login";
import SignIn from "./components/Login/SignIn";
import Cart from "./components/Customer/Cart";
import UserTable from "./components/Admin/UserTable";
import AdminLayout from "./components/Admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/C/:id" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/M/:id" element={<ManagerLayout />}>
          <Route index element={<ManagerCart />} />
          <Route path="cart" element={<ManagerHome />} />
        </Route>
        <Route path="/A/:id" element={<AdminLayout />}>
          <Route index element={<ManagerCart />} />
          <Route path="cart" element={<ManagerHome />} />
          <Route path="table" element={<UserTable />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
