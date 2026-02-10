import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/User.css";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    role: "user",
    totalRevenue: "",
    activeUsers: "",
    newSignups: "",
    conversionRate: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const normalizedUsers = storedUsers.map((u) => ({
      ...u,
      userId: Number(u.userId),
      totalRevenue: Number(u.totalRevenue),
      activeUsers: Number(u.activeUsers),
      newSignups: Number(u.newSignups),
      conversionRate: Number(u.conversionRate),
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(normalizedUsers);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      ["userId", "totalRevenue", "activeUsers", "newSignups"].includes(name) &&
      value !== "" &&
      !/^\d+$/.test(value)
    ) {
      return;
    }

    if (
      name === "conversionRate" &&
      value !== "" &&
      !/^\d*\.?\d*$/.test(value)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) return;

    const numericUserId = Number(formData.userId);

    const userIdExists = users.some(
      (u) => u.userId === numericUserId && !isEditing
    );

    if (userIdExists) return;

    const cleanedData = {
      ...formData,
      userId: numericUserId,
      totalRevenue: Number(formData.totalRevenue),
      activeUsers: Number(formData.activeUsers),
      newSignups: Number(formData.newSignups),
      conversionRate: Number(formData.conversionRate),
    };

    const updatedUsers = isEditing
      ? users.map((u) =>
          u.userId === numericUserId ? cleanedData : u
        )
      : [...users, cleanedData];

    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
    setIsEditing(false);

    setFormData({
      userId: "",
      username: "",
      email: "",
      role: "user",
      totalRevenue: "",
      activeUsers: "",
      newSignups: "",
      conversionRate: "",
    });
  };

  const handleEdit = (user) => {
    setFormData({
      userId: user.userId.toString(), username: user.username,  email: user.email,
      role: user.role, totalRevenue: user.totalRevenue.toString(), activeUsers: user.activeUsers.toString(),
      newSignups: user.newSignups.toString(), conversionRate: user.conversionRate.toString(),
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((u) => u.userId !== id);
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
  };

  return (
    <div className="userdetail">
      <h1 className="header">Admin User CRUD</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"  name="userId"  placeholder="User ID"  value={formData.userId}
          onChange={handleChange} required disabled={isEditing}/>

        <input type="text"  name="username"  placeholder="Username"  value={formData.username}
          onChange={handleChange} required/>

        <input  type="email"  name="email" placeholder="Email"  value={formData.email}
          onChange={handleChange}  required/>

        <select  className="Adminselections" name="role" value={formData.role}
          onChange={handleChange}>
          <option value="user">User</option>
        </select>

        <input  type="text" name="totalRevenue" placeholder="Total Revenue"  value={formData.totalRevenue}
          onChange={handleChange}  required/>

        <input  type="text" name="activeUsers" placeholder="Active Users" value={formData.activeUsers}
          onChange={handleChange} required/>

        <input  type="text" name="newSignups" placeholder="New Signups" value={formData.newSignups}
          onChange={handleChange} required/>

        <input type="text" name="conversionRate" placeholder="Conversion Rate"
          value={formData.conversionRate} onChange={handleChange } required/>

        <button type="submit">
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>

      <div className="card-grid">
        {users.map((user) => (
          <div className="user-card" key={user.userId}>
            <div className="card-header">
              <h3>{user.username}</h3>
              <span className="role">{user.role}</span>
            </div>

            <div className="card-body">
              <p><strong>User ID:</strong> {user.userId}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Total Revenue:</strong> {user.totalRevenue}</p>
              <p><strong>Active Users:</strong> {user.activeUsers}</p>
              <p><strong>New Signups:</strong> {user.newSignups}</p>
              <p><strong>Conversion Rate:</strong> {user.conversionRate}</p>
            </div>

            <div className="card-actions">
              <button type="button" className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(user.userId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button>
        <NavLink to="/">Back</NavLink>
      </button>
    </div>
  );
};
