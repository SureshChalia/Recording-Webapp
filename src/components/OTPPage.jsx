import React, { useState } from 'react'
import OtpInput from "react-otp-input"
import { useNavigate } from 'react-router-dom'
import { sendOtp, signUp } from '../services/operations/authAPI';

const OTPPage = ({signUpData}) => {
    const {firstName,lastName,email} = signUpData;
    const [otp,setOtp] = useState("")
    console.log(firstName,lastName,email)
    const navigate = useNavigate();
    return (
        <div>
        
        <div className='p-8 shadow-md border border-gray-300 rounded'>

        <h2 className='text-2xl font-semibold text-center'>Enter OTP</h2>

        <form onSubmit={async(e)=> {
           e.preventDefault();
           try{
            signUpData.otp = otp;
            // call create account api
           console.log(signUpData)
           const res = signUp(signUpData,navigate);
           await res(); 
           }catch(error){
             console.log("error in create account" , error)
           }
        }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          placeholder='******'
          containerStyle={"my-5"}
          inputStyle={"text-2xl mx-1 rounded shadow-xl placeholder:translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-500"}
        />
        <div className='flex justify-center gap-5'>
             <button className='border px-2 rounded bg-blue-400 text-sm py-1 font-semibold text-white hover:bg-blue-500 duration-200' onClick={() => setOtp("")} >Clear</button>
             <button className='border px-2 rounded bg-blue-400 text-sm py-1 font-semibold text-white hover:bg-blue-500 duration-200' type='submit' >Submit</button>
          </div>
        </form>
        <button className='mt-5 text-xs font-medium' onClick={async() => {
           const optFun = sendOtp(email);
           await optFun();
        }} >Resend OTP</button>
        </div>
        <div className='mt-5 text-sm font-medium text-gray-700'>
             We send otp to <span className='text-'>{"email:"+email}</span>
        </div>
      </div>
      );
    }

export default OTPPage