import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const User = await axios.post(
        "https://backend-web-blog.onrender.com/api/v1/user/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (User) {
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="m-10 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 rounded-2xl">
          <h2>Sign Up Form</h2>
          <div>
            <label htmlFor="name">Username : </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border bg-gray-500 my-2"
              type="text"
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border bg-gray-500 mb-2"
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
            Sign Up
          </button>
          <Link to="/login" className="">
            <p>Already have account.</p>Login
          </Link>
        </form>
        <br></br>
      </div>
    </div>
  );
};

export default Register;
