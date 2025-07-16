import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ import Navbar

const Attendance = () => {
  const [status, setStatus] = useState('Present');
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(atob(token.split('.')[1]));
      const userId = user.userId;

      const res = await axios.get(`http://localhost:5000/api/attendance/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(atob(token.split('.')[1]));
      const userId = user.userId;

      const res = await axios.post(
        'http://localhost:5000/api/attendance/mark',
        { userId, date: new Date().toISOString().slice(0, 10), status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchAttendance(); // Refresh records
    } catch (err) {
      alert(err.response?.data?.message || 'Error marking attendance');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Include the Navbar here */}

      <div style={{ padding: '1rem' }}>
        <h2>Mark Attendance</h2>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button onClick={handleMarkAttendance}>Submit</button>

        <h3>Your Attendance Records</h3>
        <ul>
          {records.map((rec) => (
            <li key={rec._id}>
              {new Date(rec.date).toLocaleDateString()}: {rec.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Attendance;
