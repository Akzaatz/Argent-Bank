// api.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Login error:", error.response.data.message);
    return { status: "failed", error: error.response.data.message };
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get user info response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Get user info error:", error.response.data.message);
    return { status: "failed", error: error.response.data.message };
  }
};

export const updateUserNameAPI = async (token, newUserName) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/profile`,
      { userName: newUserName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Update user name response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Update user name error:", error.response.data.message);
    throw error;
  }
};
