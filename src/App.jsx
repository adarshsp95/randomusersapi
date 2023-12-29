import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState({});
  const [bgColor, setBgColor] = useState(generateRandomColor());

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const users = response.data.users;
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setUserData(randomUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRefreshClick = () => {
    fetchUserData();
    setBgColor(generateRandomColor());
  };

  function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <h1>Random User on Refresh</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <img
            src={userData.image}
            alt="User Avatar"
            style={{ borderRadius: '50%', marginBottom: '10px' }}
          />
          <p>
            <strong>{`${userData.firstName} ${userData.lastName}`}</strong>
            <br />
            {userData.gender}
          </p>
          <p>
            Date of Birth: {userData.birthDate}
            <br />
            Weight: {userData.weight}
            <br />
            Height: {userData.height}
          </p>
          <button onClick={handleRefreshClick}>Refresh</button>
        </div>
        <div>
          <p>
            <strong>HOME ADDRESS</strong>
          </p>
          <p>
            {userData.address &&
              `${userData.address.address}, ${userData.address.city}, ${userData.address.state}, ${userData.address.postalCode}`}
          </p>
          <p>Mobile Phone: {userData.phone}</p>
          <p>Company: {userData.company && userData.company.name}</p>
          <p>Job Title: {userData.company && userData.company.title}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
