import React, { useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Settings } from "../components"; //myvideos to be added
import { useSelector } from "react-redux";
import { FaRegUser, FaVideo } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import "./SettingsPage.scss";
const SettingsPage = () => {
  const [comps, setComps] = useState(true);
  const user = useSelector((s) => s.user.currentUser);

  return (
    <>
      <div className="settingsPg-container">
        <div className="">
          <h4>Hello, {user.username} you can customize</h4>
        </div>
        <Settings />
      </div>
    </>
  );
};

export default SettingsPage;
