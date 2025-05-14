import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../../state/store";
import { Address } from "../../../api/generated-fetch";
import { addUserAddress } from "../../../state/customer/addressSlice";

interface AddressFormProps {
  handleClose: () => void;
}

const AddressFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{8}$/, "Mobile must be a 8-digit number")
    .required("Mobile is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pin Code must be a 6-digit number")
    .required("Pin Code is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  locality: yup.string().required("Locality is required"),
});

const AddressForm = ({ handleClose }: AddressFormProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik<Omit<Address, "id" | "user">>({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const jwt = localStorage.getItem("access_token") || "";
        if (!jwt) {
          console.error("No JWT found, cannot add address.");
          return;
        }
        await dispatch(
          addUserAddress({
            address: values as Address,
            jwt: jwt,
          })
        ).unwrap();

        resetForm();
        handleClose();
      } catch (error) {
        console.error("Failed to add address:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ maxHeight: "80vh", overflowY: "auto", paddingRight: 1 }}>
      <Typography variant="h6" component="p" textAlign="center" pb={3}>
        Contact Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              id="mobile"
              name="mobile"
              label="Mobile Number"
              type="tel"
              slotProps={{ htmlInput: { maxLength: 8 } }}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              id="pinCode"
              name="pinCode"
              label="Pin Code"
              type="text"
              slotProps={{ htmlInput: { maxLength: 6 } }}
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              id="address"
              name="address"
              label="Address (House No, Building, Street, Area)"
              multiline
              rows={2}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              id="locality"
              name="locality"
              label="Locality / Town"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              id="city"
              name="city"
              label="City / District"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ py: "12px", mt: 2 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save Address"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
