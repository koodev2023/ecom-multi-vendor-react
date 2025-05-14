import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useAppDispatch } from "../../../state/store";
import { sellerRegister } from "../../../state/seller/sellerAuthSlice";
import { Seller } from "../../../api/generated-fetch";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (value: number) => () => {
    const newStep = activeStep + value;

    // Ensure newStep stays within the valid range [0, steps.length - 1]
    if (newStep >= 0 && newStep < steps.length) {
      setActiveStep(newStep);
    }

    // Handle account creation only when moving beyond the last step
    if (newStep === steps.length) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = () => {
    console.log("create account");
    formik.handleSubmit();
  };

  const formik = useFormik<Seller>({
    initialValues: {
      mobile: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        locality: "",
        city: "",
        state: "",
        address: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
    },
    onSubmit: (values) => {
      console.log("Values: ", values);
      console.log("active step: ", activeStep);

      dispatch(sellerRegister({ seller: values }));
    },
  });

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, _index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : activeStep === 3 ? (
            <BecomeSellerFormStep4 formik={formik} />
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            type={activeStep === steps.length - 1 ? "submit" : "button"}
            onClick={handleStep(1)}
            variant="contained"
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
