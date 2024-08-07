// UniversityService.ts

import { fetchProductsList, addToCart, fetchSuggestionsApi,fetchFilterApi,placeOrderApi } from "./ApiService";

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./../utils/StorageUtil";

// import University from "../../models/University";

class ProductsService {
  static async fetchProductsList() {
    const data = await fetchProductsList();
    return data;
    //   try {
    //     const cachedData = getFromLocalStorage("universities");
    //     if (cachedData) {
    //       return cachedData;
    //     } else {
    //       const data = await fetchProductsList();
    //       saveToLocalStorage("universities", data);
    //       return data;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Failed to fetch universities.");
    //   }
    // }
  }
  static async addCartList(params) {
    try {
      const data = await addToCart(params);
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      throw error;
    }
  }
  static async fetchSuggestions(query) {
    try {
      const data = await fetchSuggestionsApi(query);
      return data;
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      throw error;
    }
  }
  static async fetchSearchResultsFilter(query) {
    try {
      const data = await fetchFilterApi(query);
      return data;
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      throw error;
    }
  }
  static async placeOrderService(payload) {
    try {
      const data = await placeOrderApi(payload);
      return data;
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      throw error;
    }
  }
}
export default ProductsService;
