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
      <div className="border flex flex-col justify-center items-center">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border bg-gray-500"
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
        </form>
        <br></br>

        <Link to="/login" className="">
          <p>if you do not have account?</p>Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
