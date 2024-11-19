// UniversityService.ts

import { fetchProductsList, addToCart,fetchSuggestionsApi } from "./ApiService";


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
}
export default ProductsService;
