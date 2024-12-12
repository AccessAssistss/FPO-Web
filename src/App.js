import { BrowserRouter, Route, Routes } from "react-router";
import {store} from './redux/Store'
import { Provider } from "react-redux";
import Ragistration from "./components/auth/Ragistration";
import "./App.css"
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import NewPassword from "./components/auth/NewPassword";
import DashboardLayout from "./components/dashboard/dashbordlayout/DashboardLayout";
import Opt from "./components/auth/Opt";
import ShopDetailsForm from "./components/dashboard/dashbordlayout/ShopDetailsForm";
import BankDetailsForm from "./components/dashboard/dashbordlayout/BankDetailsForm";
import Profile from "./components/dashboard/dashbordlayout/Profile";
import FarmersInformation from "./components/dashboard/members/FarmersInformation";
import MemberProfile from "./components/dashboard/members/MemberProfile";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/ragistration" element={<Ragistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/opt" element={<Opt />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/*" element={<DashboardLayout />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/shopdetails" element={<ShopDetailsForm />} />
            <Route path="/bankdetails" element={<BankDetailsForm />} />
            
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
