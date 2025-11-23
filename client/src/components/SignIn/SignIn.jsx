import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";
import { publicRequest } from "../../requestCalls";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching } = useSelector((state) => state.user);
  const handleClickLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrmsg(`Please Fill Every Section`);
    } else {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post("/auth/login", {
          email,
          password,
        });
        dispatch(loginSuccess(res.data));
        // window.location.reload();
        history.push("/");
      } catch (error) {
        dispatch(loginFailure(error.response.data));
        setErrmsg(error.response.data);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sign In</h1>
          <p>Welcome back to yMedia</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {errmsg && <div className="error-message">{errmsg}</div>}

          <button
            className="btn-primary"
            disabled={isFetching}
            onClick={handleClickLogin}
            style={{ width: "100%", padding: "0.75rem" }}
          >
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
