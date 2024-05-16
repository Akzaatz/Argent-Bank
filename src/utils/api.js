export const loginUser = async (name, password) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("Empty response");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
