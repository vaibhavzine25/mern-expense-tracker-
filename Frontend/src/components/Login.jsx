import React from "react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { BASE_URL } from "../../config/apiConfig";

const Login = () => {
  const[input, setInput] = useState({
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ChangeHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const SubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, input, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res);
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={SubmitHandler} className="w-96 p-8 shadow-lg">
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>
        <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" name="email" onChange={ChangeHandler} value={input.email}/>
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input type="password" name="password" onChange={ChangeHandler} value={input.password}/>
        </div>
        </div>
        <Button className="w-full my-5">Login</Button>
        <p className="text-sm text-center">Don't have an account?<Link to="/signup" className="text-blue-600">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
