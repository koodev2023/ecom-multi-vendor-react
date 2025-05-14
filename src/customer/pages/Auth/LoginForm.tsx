import { useFormik } from "formik";
import { login, sendLoginOtp } from "../../../state/authSlice";
import { sellerLogin } from "../../../state/seller/sellerAuthSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { Button, CircularProgress, TextField } from "@mui/material";
import { UserRoleEnum } from "../../../api/generated-fetch";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      console.log("Form values", values);
      dispatch(login(values)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log("Login successful");
          navigate("/account/orders");
        }
      });
    },
  });

  const handleSendOTP = async () => {
    console.log("Sending OTP...");
    dispatch(
      sendLoginOtp({
        email: formik.values.email,
        role: UserRoleEnum.RoleCustomer,
      })
    );
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
      </h1>

      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Email"
          disabled={auth.isSendingOTP || auth.otpSent}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {auth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              disabled={auth.isSendingOTP}
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}

        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={handleSendOTP}
            fullWidth
            disabled={auth.isSendingOTP}
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.isSendingOTP ? (
              <CircularProgress color="secondary" />
            ) : (
              "Send OTP"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
