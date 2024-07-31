import axios from "axios";

const API_URL =
  "https://qualitytechlab.com/rest-api/read.php";

const fetchProductsList = async () => {
  try {
    const response = await axios.post(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}; 

export { fetchProductsList };
