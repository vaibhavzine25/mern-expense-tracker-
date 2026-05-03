import React from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { BASE_URL } from "../../config/apiConfig";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      //network call
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`,{
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border-b border-gray-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Button variant="link" onClick={logoutHandler}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex item-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
