import React from "react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "./shared/logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { BASE_URL } from "../../config/apiConfig";

const Signup = () => {
  const[input, setInput] = useState({
    fullname:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();

  const ChangeHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const SubmitHandler = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, input, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res);
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={SubmitHandler} className="w-96 p-8 shadow-lg">
        <div className="w-full flex justify-center mb-5">
            <Logo/>
        </div>
        <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input type="text" name="fullname" onChange={ChangeHandler} value={input.fullname}/>
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" name="email" onChange={ChangeHandler} value={input.email}/>
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input type="password" name="password" onChange={ChangeHandler} value={input.password}/>
        </div>
        </div>
        <Button className="w-full my-5">Signup</Button>
        <p className="text-sm text-center">Already have an account?<Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
