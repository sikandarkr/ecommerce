// UniversityService.ts

import { fetchProductsList } from "./ApiService";

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
}
export default ProductsService;
