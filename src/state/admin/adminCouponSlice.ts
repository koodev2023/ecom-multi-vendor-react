import { Cart, Coupon } from "../../api/generated-fetch";

interface CouponState {
  coupons: Coupon[];
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponApplied: boolean;
}
