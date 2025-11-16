import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";
import { userRequest } from "../../requestCalls";
import { deleteVideoSuccess, deleteVideoStart, deleteVideoFailure } from "../../redux/videoRedux";
import "./Settings.scss";

const Settings = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(user?.username || "");
  const [email] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState(user?.bio || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.username) {
      setName(user.username);
    }
  }, [user?.username]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (!user?._id) {
        setUserVideos([]);
        return;
      }
      
      setLoading(true);
      try {
        const uTOKEN = user?.accessToken;
        const config = {
          headers: {
            token: `Bearer ${uTOKEN}`,
          },
        };
        const res = await userRequest.get(`/videos/user-videos/${user._id}`, config);
        setUserVideos(res.data);
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setUserVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserVideos();
  }, [user?._id, user?.accessToken]);

  const handleSaveName = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    // TODO: Add API call to update name
    setEditingName(false);
    setSuccess("Name updated successfully");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSavePassword = async () => {
    if (!password || !newPassword || !confirmPassword) {
      setError("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    // TODO: Add API call to update password
    setEditingPassword(false);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess("Password updated successfully");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      dispatch(deleteVideoStart());
      const uTOKEN = user?.accessToken;
      const config = {
        headers: {
          token: `Bearer ${uTOKEN}`,
        },
      };
      await userRequest.delete(`/videos/delete/${videoId}`, config);
      dispatch(deleteVideoSuccess(videoId));
      setUserVideos(userVideos.filter((video) => video._id !== videoId));
      setSuccess("Video deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      dispatch(deleteVideoFailure());
      setError("Failed to delete video");
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="settings-profile-section">
        <div className="profile-header">
          <div className="profile-icon">
            {user?.channelProfileImg ? (
              <img src={user.channelProfileImg} alt="Profile" />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="profile-info">
            {editingName ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={handleSaveName}
                  className="save-btn"
                  title="Save"
                >
                  <FaSave />
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setName(user?.username || "");
                  }}
                  className="cancel-btn"
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="name-container">
                <h2>{name}</h2>
                <button
                  onClick={() => setEditingName(true)}
                  className="edit-btn"
                  title="Edit name"
                >
                  <FaEdit />
                </button>
              </div>
            )}
            <p className="email-display">{email}</p>
          </div>
        </div>
        <div className="bio-section">
          <label htmlFor="bio">Bio / Description</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows="4"
            className="bio-textarea"
          />
        </div>
      </div>

      {/* User Details Section */}
      <div className="settings-details-section">
        <h3>Account Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="disabled-input"
            />
            <span className="info-text">Email cannot be changed</span>
          </div>

          <div className="detail-item">
            <label>Password</label>
            {editingPassword ? (
              <div className="password-edit-container">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-input"
                />
                <div className="password-actions">
                  <button onClick={handleSavePassword} className="save-btn">
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingPassword(false);
                      setPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="cancel-btn"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="password-display">
                <input
                  type="password"
                  value="••••••••"
                  disabled
                  className="disabled-input"
                />
                <button
                  onClick={() => setEditingPassword(true)}
                  className="edit-btn"
                >
                  <FaEdit /> Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="message error-message">
          <span>{error}</span>
          <button onClick={() => setError("")} className="close-btn">
            <FaTimes />
          </button>
        </div>
      )}
      {success && (
        <div className="message success-message">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} className="close-btn">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Videos Section */}
      <div className="settings-videos-section">
        <div className="videos-header">
          <h3>My Videos</h3>
          <span className="video-count">
            Total: {userVideos.length} {userVideos.length === 1 ? "video" : "videos"}
          </span>
        </div>
        {loading ? (
          <div className="loading-container">Loading videos...</div>
        ) : userVideos.length === 0 ? (
          <div className="no-videos">
            <p>You haven't uploaded any videos yet.</p>
          </div>
        ) : (
          <div className="videos-list">
            {userVideos.map((video) => (
              <div key={video._id} className="video-card">
                <div className="video-thumbnail">
                  <ReactPlayer
                    url={video.link}
                    width="100%"
                    height="100%"
                    playing={false}
                    light={true}
                    controls={false}
                  />
                </div>
                <div className="video-info">
                  <h4 className="video-title">{video.title}</h4>
                  <p className="video-detail">
                    {video.singer && `${video.singer} • `}
                    {video.description
                      ? video.description.substring(0, 100) + "..."
                      : "No description"}
                  </p>
                  <p className="video-meta">
                    {video.likes?.length || 0} likes •{" "}
                    {video.reviews?.length || 0} comments
                  </p>
                </div>
                <button
                  className="delete-video-btn"
                  onClick={() => handleDeleteVideo(video._id)}
                  title="Delete video"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
