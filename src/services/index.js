import axios from "axios";

const BASE_URL = "http://localhost:3001";
//const BASE_URL = "http://amazeengine.com";

const isTokenErrorResponse = (response) => {
  if (!response.data) {
    return false;
  }
  if (!response.data.message) {
    return false;
  }
  let msg = response.data.message.toLowerCase();
  if (msg == "authentication token missing" || msg == "wrong authentication token") {
    return true;
  }
  return false;
};

const loginUser = async (props) => {
  try {
    var result = await axios.post(`${BASE_URL}/login/`, props, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

const signUpUser = async (props) => {
  try {
    const strprops = JSON.stringify(props);
    var result = await axios.post(`${BASE_URL}/signup/`, strprops, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { BASE_URL, isTokenErrorResponse, loginUser, signUpUser, timeout };
