import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    console.log("Update user name error:", error.response.data.message);
    throw error;
  }
};
