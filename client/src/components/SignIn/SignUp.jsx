import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../../redux/userRedux";
import { publicRequest } from "../../requestCalls";
import { Link, useHistory } from "react-router-dom";
import "./SignIn.css";

const SignUp = () => {
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching } = useSelector((state) => state.user);

  const handleClickSignup = async (e) => {
    e.preventDefault();
    if (!signupEmail || !signupUsername || !signupPassword) {
      setErrmsg(`Please Fill Every Section`);
    } else {
      dispatch(registerStart());

      const signupData = {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      };
      try {
        const res = await publicRequest.post("/auth/register", signupData);
        dispatch(registerSuccess(res.data));
        history.push("/");
      } catch (error) {
        dispatch(registerFailure());
        if (error.response.data.keyValue.username) {
          setErrmsg(
            `(${error.response.data.keyValue.username}) is already taken`
          );
        } else if (error.response.data.keyValue.email) {
          setErrmsg(`Email is already taken`);
        } else if (error.response.data.keyValue.channelName) {
          setErrmsg(
            `${error.response.data.keyValue.channelName} is already taken`
          );
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sign Up</h1>
          <p>Create your yMedia account</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setSignupEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setSignupPassword(e.target.value)}
              id="password"
              placeholder="Create a password"
              minLength={6}
            />
          </div>

          {errmsg && <div className="error-message">{errmsg}</div>}
          {/* {success && <div className="success-message">{success}</div>} */}

          <button
            type="submit"
            className="btn-primary"
            disabled={isFetching}
            onClick={handleClickSignup}
            style={{ width: "100%", padding: "0.75rem" }}
          >
            {isFetching ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
