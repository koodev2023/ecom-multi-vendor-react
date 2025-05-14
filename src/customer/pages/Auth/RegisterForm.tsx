import { useFormik } from "formik";
import React from "react";
import {
  register,
  sendLoginOtp,
  sendRegisterOtp,
} from "../../../state/authSlice";
import { sellerLogin } from "../../../state/seller/sellerAuthSlice";
import { useAppDispatch } from "../../../state/store";
import { RegisterRequest, UserRoleEnum } from "../../../api/generated-fetch";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<RegisterRequest>({
    initialValues: {
      email: "",
      otp: "",
      lastName: "",
      firstName: "",
    },
    onSubmit: async (values) => {
      console.log("Form values", values);
      dispatch(
        register({
          registerRequest: values,
        })
      );
    },
  });

  const handleSendOTP = async () => {
    console.log("Sending OTP...");
    dispatch(
      sendRegisterOtp({
        email: formik.values.email!,
        role: UserRoleEnum.RoleCustomer,
      })
    );
  };

  return (
    <div className="">
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Register
      </h1>

      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {true && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
        )}

        <Button
          onClick={handleSendOTP}
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Send OTP
        </Button>

        <Button
          onClick={() => formik.handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
