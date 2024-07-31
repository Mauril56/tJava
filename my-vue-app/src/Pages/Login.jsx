import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../services/ApiService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.login(username, password);
      setMessage(response.data.message);

      // Example: Fetching users after successful login
      const usersResponse = await ApiService.getUsers();
      setUsers(usersResponse.data); // Assuming it returns an array of users

      // Set isLoggedIn to true upon successful login
      setLoggedIn(true);
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  // Redirect to Home if isLoggedIn is true
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            type="submit"
          >
            Login
          </button>
          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}

          {/* Displaying users fetched after successful login */}
          {users.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Users Fetched:</h3>
              <ul className="list-disc pl-8">
                {users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
