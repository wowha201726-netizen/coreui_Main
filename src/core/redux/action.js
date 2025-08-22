
export const setActiveSeller = (payload) => ({
  type: "active_seller",
  payload,
});

export const setSideBarVisible = (payload) => ({
  type: "sidebar_visible",
  payload,
});

export const getStoreList = (payload) => ({
  type: "store_list",
  payload,
});
