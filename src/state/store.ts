import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { sellerReducer } from "./seller/sellerSlice";
import { sellerProductReducer } from "./seller/sellerProductSlice";
import { productReducer } from "./customer/customerProductSlice";
import { authReducer } from "./authSlice";
import { cartReducer } from "./customer/cartSlice";
import { orderReducer } from "./customer/orderSlice";
import { wishlistReducer } from "./customer/wishlistSlice";
import { sellerOrderReducer } from "./seller/sellerOrderSlice";
import { sellerTransactionReducer } from "./seller/sellerTransactionSlice";
import { adminHomeCategoryReducer } from "./admin/adminHomeCategorySlice";
import { customerHomeCategoryReducer } from "./customer/customerHomeCategorySlice";
import { adminDealReducer } from "./admin/adminDealSlice";

export const rootReducer = combineReducers({
  seller: sellerReducer,
  sellerProducts: sellerProductReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  sellerOrder: sellerOrderReducer,
  sellerTransaction: sellerTransactionReducer,
  adminHomeCategory: adminHomeCategoryReducer,
  customerHomeCategory: customerHomeCategoryReducer,
  adminDeal: adminDealReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
