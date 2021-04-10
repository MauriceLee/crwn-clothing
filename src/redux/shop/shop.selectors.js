import { createSelector } from "reselect";

const selectshop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectshop],
  (shop) => shop.collections
);
