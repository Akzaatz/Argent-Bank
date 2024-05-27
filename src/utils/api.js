import axios from "axios";

export const loginUser = async (name, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: name,
        password,
      }
    );
    const token = response.data.body.token;
    localStorage.setItem("token", token);

    const defaultOptions = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    const response2 = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      defaultOptions
    );
    const user = response2.data.body;
    return user;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      username.style.border = "2px solid #FF0000";
      throw new Error("Login failed. Please try again.");
    } else {
      throw new Error(error.response.data.message);
    }
  }
};
