import * as type from '../types';


export function getProducts() {
    console.log("From action the products is...");
    return {
      type: type.GET_PRODUCTS_REQUESTED,
    }
  }

// export function SortUniversities(key) {
//   return {
//     type: type.SORT_LIST,
//     sortKey: key,
//   }
// }

// export function OnSearch(key){
//   return { 
//     type: type.SEARCH_LIST,
//     searchKey: key,
//   }
// }

// export function  OnClear(){
//   return { 
//     type: type.ON_CLEAR,
//   }
// }

// export function onRemoveData(searchTerm){
//   return{
//     type:type.REMOVE_DATA,
//     searchTerm
//   }
// }