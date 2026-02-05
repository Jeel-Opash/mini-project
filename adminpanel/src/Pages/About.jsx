import '../style/About.css';
import Data from "../api/data.json";
import { useEffect, useState } from 'react';
import { RiAdminFill } from "react-icons/ri";

export const About = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);

    const q = String(search || "").trim().toLowerCase();
    let results = [];

    if (q === "") {
      results = Data.length > 0 ? [Data[0]] : [];
    } else {
      const filtered = Data.filter((user) => {
        const username = (user.username || "").toLowerCase();
        const idStr = String(user.userId || "");
        return username.includes(q) || idStr.includes(q);
      });
      results = filtered.length > 0 ? [filtered[0]] : [];
    }

    setUsers(results);
    setLoading(false);
  }, [search]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='About-page'>
      <div className="navbar">
        <h1>Admin Panel</h1>
        <div className='user'>
          <p className='name'>jeel402</p>
          <p className='logo'><RiAdminFill /></p>
        </div>
      </div>

      <input
        type='text'
        className='search'
        value={search}
        onChange={handleSearchChange}
      />

      {users.map(user => (
        <div className='userdetail' key={user.userId}>
          <p className='userid'>User Id Number:{user.userId}</p>
          <p className='username'>Username:{user.username}</p>
          <p className='email'>UserEmail:{user.email}</p>
          <p className='totalrevenue'>TotalRevenue:{user.totalRevenue}</p>
          <p className='activeusers'>ActiveUsers:{user.activeUsers}</p>
          <p className='conversionrate'>ConversionRate:{user.conversionRate}</p>
        </div>
      ))}
    </div>
  );
};
