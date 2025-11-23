import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import "./CategoryContent.scss";

const CategoryContent = ({ videos, loading }) => {
  if (loading) {
    return (
      <div className="category-content-loading">
        <p>Loading videos...</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="category-content-empty">
        <p>No videos found in this category</p>
      </div>
    );
  }

  return (
    <div className="category-content">
      <div className="category-content-grid">
        {videos.map((vid, index) => (
          <div className="category-video-card" key={vid._id || index}>
            <Link to={`/video/${vid._id}`}>
              <ReactPlayer url={vid.link} className="category-video-thumb" />
            </Link>
            <div className="category-video-info">
              <div className="category-video-avatar">
                {vid.channelName ? (
                  <>{vid.channelName.substring(0, 2)}</>
                ) : (
                  <FaUser style={{ color: "white", fontSize: "13px" }} />
                )}
              </div>
              <div className="category-video-details">
                <h4>{vid.title}</h4>
                <p>{vid.singer}</p>
                {vid.channelName && (
                  <span>
                    {vid.channelName} <IoMdCheckmarkCircle />
                  </span>
                )}
                <p className="category-video-time">
                  {moment(vid.createdAt).startOf("hour").fromNow()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryContent;

