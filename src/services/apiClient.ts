import {
  Configuration,
  AdminControllerApi,
  AuthControllerApi,
  CartControllerApi,
  CouponControllerApi,
  DealControllerApi,
  HomeCategoryControllerApi,
  HomeControllerApi,
  OrderControllerApi,
  PaymentControllerApi,
  ProductControllerApi,
  ReviewControllerApi,
  SellerControllerApi,
  SellerOrderControllerApi,
  SellerProductControllerApi,
  TransactionControllerApi,
  UserControllerApi,
  WishlistControllerApi,
  AddressControllerApi,
} from "../api/generated-fetch";

const apiConfig = new Configuration({
  basePath: process.env.REACT_APP_API_BASE_URL || "",
});

export const adminApi = new AdminControllerApi(apiConfig);
export const authApi = new AuthControllerApi(apiConfig);
export const cartApi = new CartControllerApi(apiConfig);
export const couponApi = new CouponControllerApi(apiConfig);
export const dealApi = new DealControllerApi(apiConfig);
export const homeCategoryApi = new HomeCategoryControllerApi(apiConfig);
export const homeApi = new HomeControllerApi(apiConfig);
export const orderApi = new OrderControllerApi(apiConfig);
export const paymentApi = new PaymentControllerApi(apiConfig);
export const productApi = new ProductControllerApi(apiConfig);
export const reviewApi = new ReviewControllerApi(apiConfig);
export const sellerApi = new SellerControllerApi(apiConfig);
export const sellerOrderApi = new SellerOrderControllerApi(apiConfig);
export const sellerProductApi = new SellerProductControllerApi(apiConfig);
export const transactionApi = new TransactionControllerApi(apiConfig);
export const userApi = new UserControllerApi(apiConfig);
export const wishlistApi = new WishlistControllerApi(apiConfig);
export const addressApi = new AddressControllerApi(apiConfig);
