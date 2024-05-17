import React, {  useState } from 'react';
import LogoutPage from './Logout';
import { Navigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const handleLogout = () => {
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/logout" />;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You have successfully logged in and can see this protected content.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
