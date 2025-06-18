import axios from 'axios'

const API_URL = '/service/user'

// signin user
const signin = async (userData) => {
  const response = await axios.post(API_URL + "/signin", userData);
  console.log(response.data);

  if (response.data) {
    // Save full user info (without token)
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Save access token separately for easier access
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
  }

  return response.data;
};



// Signup user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
    signin,
    signup,
    logout,
}

export default authService

