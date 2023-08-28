import { Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Recodingpage from "./pages/Recodingpage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from "./components/ErrorPage";
import {useState} from "react"

function App() {
  const [token , setToken] = useState(localStorage.getItem("token") ? true : false)
  return (
    <div>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken} />}/>
        <Route path="/signup" element={<SignUp/>}/>
        { token && <Route path="/dashboard" element={<Recodingpage />} />}
        <Route path="*" element={<ErrorPage/>}/>
     </Routes>
     </div>
  );
}

export default App;
