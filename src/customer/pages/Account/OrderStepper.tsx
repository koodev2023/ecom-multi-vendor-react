import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Packed", description: "on Fri, 12 Jul", value: "PACKED" },
  { name: "Order Shipped", description: "on Sat, 13 Jul", value: "SHIPPED" },
  { name: "Order Arriving", description: "on Sun, 14 Jul", value: "ARRIVING" },
  { name: "Order Arrived", description: "on Mon, 15 Jul", value: "ARRIVED" },
];

const canceledSteps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Canceled", description: "on Fri, 12 Jul", value: "CANCELED" },
];

const currentStep = 2;

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELED") {
      setStatusStep(canceledSteps);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <div className="my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "bg-gray-200 text-teal-500"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircle />
                ) : (
                  <FiberManualRecord sx={{ zIndex: -1 }} />
                )}
              </div>

              {index < statusStep.length - 1 && (
                <div
                  className={`border h-20 w-1 ${
                    index < currentStep
                      ? "bg-teal-500"
                      : "bg-gray-300 text-gray-600"
                  }`}
                ></div>
              )}
            </div>

            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                } ${
                  orderStatus === "CANCELED" && step.value === orderStatus
                    ? "bg-red-500"
                    : ""
                } w-full`}
              >
                <p className="">{step.name}</p>
                <p
                  className={`${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  } text-sm`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default OrderStepper;
