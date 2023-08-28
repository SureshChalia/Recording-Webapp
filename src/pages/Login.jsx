import React,{useEffect, useState} from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { formStyle } from "../constants/styles";
import { login } from "../services/operations/authAPI";

const Login = ({token,setToken}) => {
  const navigate = useNavigate();
  const [loginData,setLoginData] = useState({
     email:"",
     name:""
  })

  function handleOnChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
     if(token)
     {
       navigate("/dashboard");
     }
  },[])

  return (
    <Layout>
      <div className="flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="sm:text-4xl text-2xl font-bold">Sign In</h1>
            <p>sign in to your account</p>
          </div>
          <div>
            <form onSubmit={async(e) => { 
               e.preventDefault() 
               try{
                 const loginRes = login(loginData.email,loginData.name,navigate);
                 await loginRes();
                 setToken(true);
               }catch(error){
                 console.log("error in login page" , error);
               }
               
            }} className="flex gap-2 flex-col rounded-lgPlus bg-white p-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className={formStyle.labelStyleRequired + " w-fit"}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={handleOnChange}
                  name="email"
                  id="email"
                  required
                  className={
                    formStyle.inputStyle +
                    "invalid:text-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className={formStyle.labelStyleRequired + " w-fit"}
                >
                  name
                </label>
                <input
                  type="text"
                  value={loginData.name}
                  onChange={handleOnChange}
                  name="name"
                  id="name"
                  required
                  className={formStyle.inputStyle}
                />
              </div>
              <div>
                <button
                  className="bg-blue-500 font-bold text-white w-full rounded-lgPlus py-1"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="text-center mt-3 text-[#858585]">
              Don't have an account?
              <Link to="/signup" className="text-[#346BD4]">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
