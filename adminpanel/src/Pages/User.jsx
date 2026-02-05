import { NavLink } from "react-router-dom";
import Data from "../api/data.json";
import '../style/User.css';

export const User = () => {
  return (
    <div className="userdetail">
      <h1 className="header">User Details</h1>

      <table
        border={1}
        style={{width: "100%", textAlign: "left",borderCollapse: "collapse", }} >
        <thead>
          <tr>
        <th>userId</th>
        <th>username</th>
        <th>email</th>
        <th>role</th>
        <th>totalRevenue</th>
        <th>activeUsers</th>
        <th>newSignups</th>
        <th>conversionRate</th>
          </tr>
        </thead>

        <tbody>
          {Data.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.totalRevenue}</td>
              <td>{user.activeUsers}</td>
              <td>{user.newSignups}</td>
              <td>{user.conversionRate}</td>
              <td>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button><NavLink to="/">Back</NavLink></button>
    </div>
  );
};
