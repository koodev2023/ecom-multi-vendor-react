import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../state/store";
import { paymentSuccess } from "../../../state/customer/orderSlice";
import { paymentApi } from "../../../services/apiClient";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const getQueryParams = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      const session_id = getQueryParams("session_id");
      if (!session_id) {
        console.error("session_id not found in URL");
        return;
      }

      const res = await paymentApi.getStripePaymentId({
        authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
        sessionId: session_id || "",
      });

      console.log("Payment ID response:", res);
      if (!res.data) {
        console.error("Payment ID not found in response");
        return;
      }

      dispatch(
        paymentSuccess({
          jwt: localStorage.getItem("access_token") || "",
          paymentId: res.data || "",
          paymentLinkId: session_id || "",
        })
      );
    };

    fetchPaymentData();
  }, [orderId]);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="bg-primary-color text-white p-8 w-[90%] lg:w-1/4 border rounded-md h-2/5 flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Congratulations!</h1>
        <h1 className="text-2xl font-semibold">Your payment was successful.</h1>

        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Shop More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
