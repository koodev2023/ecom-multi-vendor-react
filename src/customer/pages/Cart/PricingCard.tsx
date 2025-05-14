import { Divider } from "@mui/material";
import { Cart } from "../../../api/generated-fetch";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";
import { fetchUserCart } from "../../../state/customer/cartSlice";

const PricingCard = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("access_token") || ""));
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>${cart.cart?.totalMrpPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>{cart.cart?.discount}% off</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform Fee</span>
          <span>Free</span>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5">
        <span>Total</span>
        <span>${cart.cart?.totalSellingPrice}</span>
      </div>
    </>
  );
};

export default PricingCard;
