import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      if (input.password !== input.confirmPassword) {
        return toast.error("please check confirm password again");
        //alert("please check confirm password again");
      }
      // จัด input ส่ง api
      const rs = await axios.post("http://localhost:8888/auth/register", input);

      if (rs.status === 201) {
        //alert("Register Successful");
        toast.success("Register Successful");
      }

      navigate("/login");
    } catch (err) {
      //alert(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div>
        <h1 className="text-4xl my-10 text-center">Register Form</h1>
        <form
          className="border w-3/4 mx-auto p-4 rounded-lg"
          onSubmit={hdlSubmit}
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Firstname :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="firstName"
              value={input.firstName}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Lastname :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="lastName"
              value={input.lastName}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username :</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password :</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Confirm password :</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>

          <button className="btn btn-outline btn-primary mt-6 w-full">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
