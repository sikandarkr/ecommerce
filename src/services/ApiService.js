import axios from "axios";

const API_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

const fetchUniversitiesList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export { fetchUniversitiesList };
