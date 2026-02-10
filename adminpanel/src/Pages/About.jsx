import "../style/About.css";
import { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";

export const About = () => {
  const [users, setUsers] = useState([]);
  const [displayUser, setDisplayUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setDisplayUser(storedUsers[0] || null);
    setLoading(false);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const q = value.toLowerCase();

    if (!q) {
      setDisplayUser(users[0] || null);
      return;}

    const foundUser = users.find((user) =>
        user.username.toLowerCase().includes(q) ||
        String(user.userId).includes(q));
setDisplayUser(foundUser || null);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="About-page">
      <div className="navbar">
        <h1>Admin Panel</h1>
        <div className="user">
          <p className="name">jeel402</p>
          <p className="logo">
            <RiAdminFill />
          </p>
        </div>
      </div>

      <input type="text" className="search" placeholder="Search by UserId or Username"
        value={search} onChange={handleSearchChange}/>

      {displayUser ? (<div className="userdetail">
  <div className="stats-grid">
    <div className="stat-card green">
      <h4>User ID</h4>
      <p>{displayUser.userId}</p>
    </div>

    <div className="stat-card green">
      <h4>Username</h4>
      <p>{displayUser.username}</p>
    </div>

    <div className="stat-card green">
      <h4>Email</h4>
      <p>{displayUser.email}</p>
    </div>

    <div className="stat-card green">
      <h4>Role</h4>
      <p>{displayUser.role}</p>
    </div>

    <div className={`stat-card ${displayUser.totalRevenue <30000 ? "red" :"green"}`}>
      <h4>Total Revenue</h4>
      <p>{displayUser.totalRevenue}</p>
    </div>

    <div className="stat-card green">
      <h4>Active Users</h4>
      <p>{displayUser.activeUsers}</p>
    </div>

    <div className="stat-card green">
      <h4>New Signups</h4>
      <p>{displayUser.newSignups}</p>
    </div>

    <div className="stat-card green">
      <h4>Conversion Rate</h4>
      <p>{displayUser.conversionRate}</p>
    </div>
  </div>
</div>) : (<p className="no-user">No user found</p>
      )}
    </div>
  );
};
