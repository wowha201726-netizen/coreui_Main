import initialState from "./initial.value";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "active_seller":
      return { ...state, active_seller: action.payload };
    case "store_list":
      return { ...state, store_list: action.payload };

    case "sidebar_visible":
      return { ...state, sidebar_visible: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
