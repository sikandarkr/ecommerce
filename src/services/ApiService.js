import axios from "axios";

const API_URL =
  "https://qualitytechlab.com/rest-api/read.php";
const API_ADD_CART =
  "https://qualitytechlab.com/rest-api/addToCart.php";
const SEARCH_API =
  "https://qualitytechlab.com/rest-api/search.php";
const ORDER_API = "https://qualitytechlab.com/rest-api/createorders.php";

const SEND_OTP_API = "https://qualitytechlab.com/rest-api/otpverify.php"

const fetchProductsList = async () => {
  try {
    const response = await axios.post(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const addToCart = async (params) => {
  try {
    const response = await axios.post(API_ADD_CART, params, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct Content-Type header
      },
    });
    console.log("Response Data:", response.data);  // For debugging
    return response.data;
  } catch (error) {
    console.error("Error in addToCart:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add item to cart");
  }
}

const fetchSuggestionsApi = async (params) => {
  try {
    const response = await axios.post(SEARCH_API, params, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct Content-Type header
      },
    });
    console.log("Response Data:", response.data);  // For debugging
    return response.data;
  } catch (error) {
    console.error("Error in addToCart:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add item to cart");
  }
}

const fetchFilterApi = async (params) => {
  try {
    const response = await axios.post(SEARCH_API, params, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct Content-Type header
      },
    });
    console.log("Response Data:", response.data);  // For debugging
    return response.data;
  } catch (error) {
    console.error("Error in addToCart:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add item to cart");
  }
}

const placeOrderApi = async (params) => {
  try {
    const response = await axios.post(ORDER_API, params, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in addToCart:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add item to cart");
  }
}








const sendOtpApi = async (params) => {
  try {
    const response = await axios.post(SEND_OTP_API, params, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct Content-Type header
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in addToCart:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add item to cart");
  }
}
export { fetchProductsList, addToCart, fetchSuggestionsApi, fetchFilterApi, placeOrderApi, sendOtpApi };
