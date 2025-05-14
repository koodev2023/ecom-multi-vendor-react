import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  Address,
  CreateOrderHandlerPaymentMethodEnum,
} from "../../../api/generated-fetch";
import { createOrder } from "../../../state/customer/orderSlice";
import { fetchUserCart } from "../../../state/customer/cartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const paymentGatewayList = [
  {
    value: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    label: "Stripe",
  },
  {
    value: "RAZORPAY",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    label: "Razorpay",
  },
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [payment, setPayment] = useState(
    CreateOrderHandlerPaymentMethodEnum.Stripe
  );
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const authState = useAppSelector((state) => state.auth);
  const addressesArray: Address[] = authState.user?.addresses
    ? Array.from(authState.user?.addresses)
    : [];

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value as CreateOrderHandlerPaymentMethodEnum);
  };

  const handleSelectAddress = (addressId: number | undefined) => {
    setSelectedAddressId(typeof addressId === "number" ? addressId : null);
  };

  React.useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("access_token") || ""));
  }, []);

  React.useEffect(() => {
    if (selectedAddressId === null && addressesArray.length > 0) {
      const firstValidAddress = addressesArray.find(
        (addr) => typeof addr.id === "number"
      );
      if (firstValidAddress?.id !== undefined) {
        setSelectedAddressId(firstValidAddress.id);
      }
    }
  }, [addressesArray, selectedAddressId]);

  const handleCheckOut = (event: any) => {
    if (selectedAddressId === null) {
      console.error("Cannot checkout without selecting an address.");
      return;
    }
    console.log("Checkout initiated with:");
    console.log("Selected Address ID:", selectedAddressId);
    console.log("Payment Gateway:", payment);
    const selectedAddressDetails = addressesArray.find(
      (addr) => addr.id === selectedAddressId
    );

    console.log("Selected Address Details:", selectedAddressDetails);

    dispatch(
      createOrder({
        paymentGateway: payment,
        jwt: authState.jwt || localStorage.getItem("access_token") || "",
        address: selectedAddressDetails!,
      })
    );
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-10 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <Typography variant="h6" component="h1">
                Select Delivery Address
              </Typography>
              <Button variant="outlined" size="small" onClick={handleOpen}>
                Add New Address
              </Button>
            </div>

            {addressesArray.length > 0 ? (
              <div className="space-y-3">
                {addressesArray.map((address) =>
                  address.id !== undefined ? (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={selectedAddressId === address.id}
                      onSelect={handleSelectAddress}
                    />
                  ) : null
                )}
              </div>
            ) : (
              <Typography sx={{ mt: 2, mb: 2, color: "text.secondary" }}>
                No saved addresses found. Please add an address to proceed.
              </Typography>
            )}
            <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
              Add New Address
            </Button>
          </div>

          <div className="space-y-5">
            <div className="border p-5 rounded-md shadow-sm">
              <Typography
                variant="subtitle1"
                component="h2"
                className="font-medium pb-3 text-center border-b mb-4"
              >
                Choose Payment Gateway
              </Typography>
              <RadioGroup
                row
                aria-labelledby="payment-gateway-group-label"
                name="payment-gateway-group"
                onChange={handlePaymentChange}
                value={payment}
                className="flex flex-wrap"
              >
                {paymentGatewayList.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    sx={{
                      width: "47%",
                      m: 0.5,
                      "& .MuiFormControlLabel-label": { width: "100%" },
                    }}
                    value={item.value}
                    control={
                      <Radio
                        size="small"
                        disabled={item.value === "RAZORPAY"}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 35,
                        }}
                      >
                        <img
                          style={{
                            maxHeight:
                              item.value === "STRIPE" ? "20px" : "24px",
                            maxWidth: "80px",
                            objectFit: "contain",
                          }}
                          src={item.image}
                          alt={item.label}
                        />
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="border rounded-md shadow-sm">
              {cart.cart && <PricingCard />}
              <div className="p-5">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: "12px", fontSize: "1rem" }}
                  disabled={
                    selectedAddressId === null || addressesArray.length === 0
                  }
                  onClick={handleCheckOut}
                >
                  Checkout
                </Button>
                {selectedAddressId === null && addressesArray.length > 0 && (
                  <Typography
                    variant="caption"
                    color="error"
                    display="block"
                    textAlign="center"
                    mt={1}
                  >
                    Please select a delivery address.
                  </Typography>
                )}
                {addressesArray.length === 0 && (
                  <Typography
                    variant="caption"
                    color="error"
                    display="block"
                    textAlign="center"
                    mt={1}
                  >
                    Please add an address before checkout.
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-address-modal-title"
        aria-describedby="add-new-address-modal-description"
      >
        <Box sx={style}>
          <AddressForm handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
