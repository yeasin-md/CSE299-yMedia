import React from "react";
import "./MyVideos.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaUser, FaUpload, FaShare } from "react-icons/fa"; // ADDED: Icons for section headers
import ReactPlayer from "react-player";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../Loading/Loading";
import { BiRepost } from "react-icons/bi";

const MyVideos = () => {
  const user = useSelector((state) => state.user.currentUser);
  const videos = useSelector((state) => state.video.videos);
  const loading = useSelector((state) => state.video.isFetching);
  const userVideos = videos.filter((r) => r.userId.includes(user._id));
  const userRepostedVideos = videos.filter((video) =>
    video.reposts.some((r) => r.repostedUser === user._id)
  );

  // ADDED: Render video card component to avoid code duplication
  const renderVideoCard = (vid, index) => (
    <div className="my-videos-card" key={vid._id || index}>
      <Link to={`/video/${vid._id}`} className="my-videos-thumbnail-link">
        <ReactPlayer url={vid.link} className="my-videos-thumb-img" />
      </Link>
      <div className="my-videos-info">
        <div className="my-videos-avatar">
          {vid.channelName ? (
            <>{vid.channelName.substring(0, 2)}</>
          ) : (
            <FaUser style={{ color: "white", fontSize: "13px" }} />
          )}
        </div>
        <div className="my-videos-details">
          <h4>{vid.title}</h4>
          <p>{vid.singer}</p>
          {vid.channelName && (
            <span>
              {vid.channelName} <IoMdCheckmarkCircle />
            </span>
          )}
          <p className="my-videos-time">
            {moment(vid.createdAt).startOf("hour").fromNow()}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-videos-page">
      {/* ADDED: Beautiful header section */}
      <div className="my-videos-header">
        <div className="my-videos-header-content">
          <h1>My Videos</h1>
          <p className="my-videos-subtitle">
            Hello, {user.username}! Manage your content and reposts
          </p>
          <div className="my-videos-stats">
            <div className="stat-item">
              <FaUpload className="stat-icon" />
              <span className="stat-number">{userVideos.length}</span>
              <span className="stat-label">Uploads</span>
            </div>
            <div className="stat-item">
              <BiRepost className="stat-icon" />
              <span className="stat-number">{userRepostedVideos.length}</span>
              <span className="stat-label">Reposts</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADDED: Main content container with proper spacing */}
      <div className="my-videos-content">
        {/* ADDED: Reposted Videos Section */}
        {userRepostedVideos.length > 0 && (
          <section className="my-videos-section">
            <div className="section-header">
              <BiRepost className="section-icon" />
              <h2>Reposted Videos</h2>
              <span className="section-count">
                ({userRepostedVideos.length})
              </span>
            </div>
            {loading ? (
              <div className="my-videos-loading">
                <Loading />
              </div>
            ) : (
              <div className="my-videos-grid">
                {userRepostedVideos
                  ?.slice(0)
                  .reverse()
                  .map((vid, index) => renderVideoCard(vid, index))}
              </div>
            )}
          </section>
        )}

        {/* ADDED: Uploaded Videos Section */}
        {userVideos.length > 0 && (
          <section className="my-videos-section">
            <div className="section-header">
              <FaUpload className="section-icon" />
              <h2>My Uploads</h2>
              <span className="section-count">({userVideos.length})</span>
            </div>
            {loading ? (
              <div className="my-videos-loading">
                <Loading />
              </div>
            ) : (
              <div className="my-videos-grid">
                {userVideos
                  ?.slice(0)
                  .reverse()
                  .map((vid, index) => renderVideoCard(vid, index))}
              </div>
            )}
          </section>
        )}

        {/* ADDED: Empty state when no videos */}
        {!loading &&
          userVideos.length === 0 &&
          userRepostedVideos.length === 0 && (
            <div className="my-videos-empty">
              <FaUpload className="empty-icon" />
              <h3>No videos yet</h3>
              <p>
                Start by uploading your first video or reposting content you
                love!
              </p>
              <Link to="/create-video" className="empty-action-btn">
                Create Video
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyVideos;
