import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload.products;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
