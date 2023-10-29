import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Signup.css";
import bgImg from '../../Assets/Images/product.png';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

export default function Form() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/');
  };
  const onSubmit = data => console.log(data);

  // console.log(watch('username'));

  return (
    <section className='si'>
      <div className="register">
        <div className="col-1">
          <div className="close-icon" onClick={handleNavigation}>
            <FaTimes />
          </div>
          <h2>Sign Up</h2>
          <span>Register & get 10% off on your first order</span>
          <br></br>
          <br></br>
          <button className="signup-with-mail-btn"><BsGoogle />{'\u00a0\u00a0\u00a0'}Sign Up with Google</button>

          <div className="or-line">or</div>

          <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("username")} placeholder='username' />
            <input type="text" {...register("password")} placeholder='password' />
            <input type="text" {...register("confirmpwd")} placeholder='confirm password' />
            <input type="text" {...register("email", { required: true })} placeholder='email' />
            {errors.email?.type === "required" && "Email is required"}
            <button className='btn'>Sign Up</button>
            <div className="policy">
              By continuing, I agree to Elini Privacy Policy and Terms of use
            </div>
            <div className="old-customer">
              <Link to="/login"><p>
                Old customer? LogIn to your existing account
              </p>
              </Link>
            </div>
          </form>

        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  )
}
