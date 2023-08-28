import React, { useState } from "react";
import Layout from "../components/Layout";
import { formStyle } from "../constants/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OTPPage from "../components/OTPPage";
import { sendOtp } from "../services/operations/authAPI";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [content, setContent] = useState(true);

  function handleOnChange(e) {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      //  call send otp api
      const res = sendOtp(signUpData.email);
     const response = await res();
     if(response){
       setContent(false);
     }
    } catch(error) {
      toast.error("error in sending otp");
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center border bg-[#F5F5F5]">
        {content ? (
          <div className="flex flex-col gap-4 ">
            <div>
              <h1 className="sm:text-4xl text-2xl font-bold">Create Account</h1>
              <p>Fill below details for Creating Account</p>
            </div>
            <div>
              <form
                className="flex gap-2 flex-col rounded-lgPlus bg-white p-4 "
                onSubmit={handleOnSubmit}
              >
                <div className="flex lg:flex-row flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="firstName"
                      className={formStyle.labelStyleRequired + " w-fit"}
                    >
                      First Name
                    </label>
                    <input
                      value={signUpData.firstName}
                      onChange={handleOnChange}
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={formStyle.inputStyle}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      value={signUpData.lastName}
                      onChange={handleOnChange}
                      type="text"
                      name="lastName"
                      id="lastName"
                      className={formStyle.inputStyle}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className={formStyle.labelStyleRequired + " w-fit"}
                  >
                    Email address
                  </label>
                  <input
                    value={signUpData.email}
                    onChange={handleOnChange}
                    type="email"
                    name="email"
                    id="email"
                    required
                    className={
                      formStyle.inputStyle +
                      "invalid:text-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    }
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-500 font-bold text-white w-full rounded-lgPlus py-1 mt-2"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
              <Link
                to="/"
                className="text-blue-700 flex items-center gap-2 w-fit justify-center"
              >
                <i className="fa-solid fa-left-long fa-sm"></i>
                <button className="">Back to Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <OTPPage signUpData={signUpData} />
        )}
      </div>
    </Layout>
  );
};

export default SignUp;
