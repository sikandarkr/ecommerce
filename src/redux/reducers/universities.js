const initialState = {
  loading: false,
  data: [],
  list: [],
};

export default function universities(state = initialState, action) {
  switch (action.type) {
    case "GET_UNIVERSITIES_REQUESTED":
      return { ...action.data, loading: true };
    case "GET_UNIVERSITIES_SUCCESS":
      return {
        // returning a copy of orignal state
        ...state, //copying the original state
        data: action.data, //new todos array ,
        list: action.data,
        loading: false,
      };
      case "GET_UNIVERSITIES_FAILED":
        return {
          ...state, //copying the original state
          data: action.error,
          loading: false,
        };
    case "SEARCH_LIST":
      console.log(action.searchKey);
      const filtered = state.data.filter((university) =>
        university.name.toLowerCase().includes(action.searchKey.toLowerCase())
      );
      return {
        ...state,
        data: filtered,
        loading: false,
      };
      case "ON_CLEAR":
      return {
        ...state,
        data: state.list,
      };
      case "REMOVE_DATA":
        var filter = "name";
        var filteredData = state.data.filter(function (obj) {
            return obj[filter]!=action.searchTerm;
          });
          return {
            ...state,
            data: filteredData,
          };
      case "SORT_LIST":
        const sortedArray = [...state.data].sort((a, b) => {
              return action.sortKey === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            });
             return {
            ...state,
            data: sortedArray,
          };
          case "FILTERDATA":
            var filter = "name";
            var filteredData = state.data.filter(function (obj) {
              return obj[filter].includes(action.data);
            }); 
            return {
              ...state,
              data: filteredData,
              loading: false,
            };
    default:
      return state;
  }
}
