import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserOrderHistory } from "../../../state/customer/orderSlice";
import { useEffect } from "react";
import OrderItem from "./OrderItem";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("access_token") || ""));
  }, []);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>

      <div className="space-y-2">
        {orderState.orders.map((order) =>
          order.orderItems?.map((item) => (
            <OrderItem key={item.id} order={order} orderItem={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
