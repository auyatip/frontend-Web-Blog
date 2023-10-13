import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const User = await axios.post(
        "https://backend-web-blog.onrender.com/api/v1/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (!User) {
        return console.log("Not Have Account");
      }
      localStorage.setItem("userId", User?.data?.user?._id);
      console.log(User.data.user._id);
      dispatch(authActions.login());
      alert("User Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Your email or password is INVALID");
      localStorage.clear();
    }
  };
  return (
    <div>
      <div className="m-4 flex flex-col justify-center items-center">
        <div className="flex gap-5 items-center">
          <div className=" flex flex-col shadow-xl items-center bg-gray-300 text-black rounded-xl w-1/2 p-5">
            <h1>User1</h1>
            <p>email: user1@gmail.com</p>
            <p>password: user1</p>
          </div>
          <div className=" flex flex-col items-center shadow-xl bg-gray-300 text-black rounded-xl w-1/2 p-5">
            <h1>User2</h1>
            <p>email: user2@gmail.com</p>
            <p>password: user2</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-gray-700 p-10 rounded-2xl"
        >
          <div>
            <h2>LOGIN</h2>
            <label htmlFor="email">Email : </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border bg-gray-500 my-2"
              type="email"
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border bg-gray-500"
              type="password"
            ></input>
          </div>
          <button type="submit" className="border p-2 m-2 bg-green-700">
            LOGIN
          </button>
          <Link to="/register" className="">
            <p>if you do not have account?</p>Register
          </Link>
        </form>
        <br></br>
      </div>
    </div>
  );
};

export default Login;
