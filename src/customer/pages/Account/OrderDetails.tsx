import {
  Box,
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments, RateReview } from "@mui/icons-material"; // Added RateReview for icon
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../state/customer/orderSlice";
import { OrderOrderStatusEnum } from "../../../api/generated-fetch";

// Helper function to format currency
const formatCurrency = (amount?: number) => {
  if (typeof amount !== "number") return "N/A";
  // You can use a more sophisticated library like Intl.NumberFormat if needed
  return `$${amount.toFixed(2)}`;
};

// Helper function to format dates
const formatDate = (dateValue?: Date | string) => {
  if (!dateValue) return "N/A";
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId, orderItemId } = useParams<{
    orderId: string;
    orderItemId?: string;
  }>(); // Make orderItemId optional

  // Assuming your Redux state for order looks like this:
  // state.order: { currentOrder: Order | null, orderItem: OrderItem | null, loading: boolean, error: any }
  const {
    currentOrder,
    orderItem: fetchedOrderItem,
    loading, // Added loading state from selector
    error, // Added error state from selector
  } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(
        fetchOrderById({
          jwt: localStorage.getItem("access_token") || "",
          orderId: Number(orderId),
        })
      );
    }
    // Only fetch orderItem if orderItemId is present
    if (orderItemId) {
      dispatch(
        fetchOrderItemById({
          jwt: localStorage.getItem("access_token") || "",
          orderItemId: Number(orderItemId),
        })
      );
    }
  }, [dispatch, orderId, orderItemId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load order details. Please try again later.
        </Typography>
        <Typography color="error.light">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </Typography>
      </Box>
    );
  }

  if (!currentOrder) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">Order not found.</Typography>
      </Box>
    );
  }

  // If orderItemId is provided, we expect fetchedOrderItem to be populated.
  // The product section will only render if fetchedOrderItem is available.
  const itemToDisplay = orderItemId
    ? fetchedOrderItem
    : currentOrder.orderItems && currentOrder.orderItems.length > 0
    ? currentOrder.orderItems[0]
    : null;
  // Fallback to first item if no specific item ID, or make this section conditional

  const itemDiscount =
    itemToDisplay?.mrpPrice && itemToDisplay?.sellingPrice
      ? itemToDisplay.mrpPrice - itemToDisplay.sellingPrice
      : 0;

  const cancellableStatuses: (OrderOrderStatusEnum | undefined)[] = [
    OrderOrderStatusEnum.Pending,
    OrderOrderStatusEnum.Placed,
    OrderOrderStatusEnum.Confirmed,
  ];
  const isCancellable =
    currentOrder?.orderStatus &&
    cancellableStatuses.includes(currentOrder.orderStatus);
  const isCancelled =
    currentOrder?.orderStatus === OrderOrderStatusEnum.Cancelled;

  return (
    <Box sx={{ padding: { xs: 1, md: 3 }, maxWidth: "800px", margin: "auto" }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 2 }}
      >
        Order Details: #{currentOrder.orderId || currentOrder.id}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
        Order Placed: {formatDate(currentOrder.orderDate)}
      </Typography>

      {/* This section focuses on a specific item if orderItemId is present */}
      {itemToDisplay && (
        <section className="flex flex-col gap-5 justify-center items-center mb-8 border p-4 rounded-md shadow-sm">
          <img
            className="w-32 h-32 object-contain rounded"
            src={
              (itemToDisplay.product?.images &&
                itemToDisplay.product?.images[0]) ||
              "https://via.placeholder.com/128?text=No+Image"
            }
            alt={itemToDisplay.product?.title || "Product image"}
          />
          <div className="text-sm space-y-1 text-center">
            <Typography variant="h6" component="h1" className="font-bold">
              {itemToDisplay.product?.title || "Product Title N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sold by:
              {itemToDisplay.product?.seller?.businessDetails?.businessName ||
                "Brand N/A"}
            </Typography>
            {itemToDisplay.size && (
              <Typography variant="body2">
                <strong>Size: </strong>
                {itemToDisplay.size}
              </Typography>
            )}
            <Typography variant="body2">
              <strong>Quantity: </strong>
              {itemToDisplay.quantity || 1}
            </Typography>
          </div>
          <div>
            {itemToDisplay.product?.id && (
              <Button
                variant="outlined"
                startIcon={<RateReview />}
                onClick={() =>
                  navigate(`/reviews/${itemToDisplay.product!.id}/create`)
                }
              >
                Write Review
              </Button>
            )}
          </div>
        </section>
      )}

      {/* If there's no specific item via orderItemId, you might want to list all items */}
      {!orderItemId &&
        currentOrder.orderItems &&
        currentOrder.orderItems.length > 0 && (
          <Box mb={4} className="border p-4 rounded-md shadow-sm">
            <Typography variant="h6" gutterBottom>
              Order Items ({currentOrder.totalItemCount})
            </Typography>
            {currentOrder.orderItems.map((item) => (
              <Box
                key={item.id}
                mb={2}
                pb={2}
                sx={{ display: "flex", gap: 2, borderBottom: "1px solid #eee" }}
              >
                <img
                  src={
                    (item.product?.images && item.product?.images[0]) ||
                    "https://via.placeholder.com/80?text=No+Image"
                  }
                  alt={item.product?.title}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {item.product?.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Brand: {item.product?.seller?.businessDetails?.businessName}
                  </Typography>
                  {item.size && (
                    <Typography variant="body2" color="textSecondary">
                      Size: {item.size}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    Qty: {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Price: {formatCurrency(item.sellingPrice)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

      <section className="mb-8">
        <OrderStepper activeStepProp={currentOrder.orderStatus} />
        {/* Assuming OrderStepper can map status string to step index */}
        {/* Or you might need to convert currentOrder.orderStatus to a number */}
      </section>

      <div className="border p-5 rounded-md shadow-sm mb-8">
        <Typography variant="h6" component="h1" className="font-bold pb-3">
          Delivery Address
        </Typography>
        <div className="text-sm space-y-2">
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-medium items-center">
            <Typography variant="body1">
              {currentOrder.shippingAddress?.name ||
                currentOrder.user?.firstName ||
                ""}
              {currentOrder.shippingAddress?.name ||
                currentOrder.user?.lastName ||
                "Customer"}
            </Typography>
            <Divider
              flexItem
              orientation="vertical"
              sx={{ display: { xs: "none", sm: "block" } }}
            />
            <Typography variant="body1">
              {currentOrder.shippingAddress?.mobile || "Mobile N/A"}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            {currentOrder.shippingAddress?.address || "Street Address N/A"}
            , <br />
            {currentOrder.shippingAddress?.city || "City N/A"},
            {currentOrder.shippingAddress?.state || "State N/A"} -
            {currentOrder.shippingAddress?.pinCode || "Zip N/A"}
          </Typography>
        </div>
      </div>

      {/* Price details: Show total order price, not just one item's */}
      <div className="border space-y-4 p-5 rounded-md shadow-sm">
        <Typography variant="h6" component="h1" className="font-bold pb-2">
          Price Summary
        </Typography>

        <div className="flex justify-between text-sm">
          <Typography variant="body2">Total MRP:</Typography>
          <Typography variant="body2">
            {formatCurrency(currentOrder.totalMrpPrice)}
          </Typography>
        </div>
        <div className="flex justify-between text-sm">
          <Typography variant="body2" sx={{ color: "green" }}>
            Discount:
          </Typography>
          <Typography variant="body2" sx={{ color: "green" }}>
            {currentOrder.discount}% off
          </Typography>
        </div>
        <Divider />
        <div className="flex justify-between text-sm font-bold">
          <Typography variant="body1">Total Amount:</Typography>
          <Typography variant="body1">
            {formatCurrency(currentOrder.totalSellingPrice)}
          </Typography>
        </div>

        {currentOrder.discount && currentOrder.discount > 0 && (
          <Typography
            variant="caption"
            sx={{ color: "green", display: "block", textAlign: "right" }}
          >
            You saved{" "}
            {formatCurrency(
              currentOrder.totalMrpPrice! - currentOrder.totalSellingPrice!
            )}{" "}
            on this order!
          </Typography>
        )}

        <div className="px-1 py-3">
          {/* Adjusted padding for better looks */}
          <div className="bg-teal-50 px-5 py-3 text-sm font-medium flex items-center gap-3 rounded">
            {/* Increased padding and rounded corners */}
            <Payments />
            <Typography variant="body2">
              Status:
              {currentOrder.paymentStatus || "N/A"}
            </Typography>
          </div>
        </div>

        {/* Removed "Sold By" as it's more relevant per item or if there's a single seller for the order */}
        {/* If there's a single seller for the whole order, you can add it here: */}
        {/* {currentOrder.sellerId && <p className="text-xs"><strong>Sold By Seller ID: </strong>{currentOrder.sellerId}</p>} */}

        <Divider sx={{ mt: 2, mb: 2 }} />

        <div className="pt-5">
          {/* Changed p-10 to pt-5 for consistency */}
          <Button
            disabled={!isCancellable || isCancelled}
            onClick={() => {
              // Dispatch cancel order action here
              // Example: dispatch(cancelOrder({ orderId: currentOrder.id, jwt: "..." }))
              console.log(
                "Cancel order clicked for order ID:",
                currentOrder.id
              );
            }}
            color="error"
            sx={{ py: "0.7rem" }}
            variant="outlined"
            fullWidth
          >
            {isCancelled
              ? "Order Canceled"
              : isCancellable
              ? "Cancel Order"
              : "Cannot Cancel Order"}
          </Button>
          {currentOrder.deliverDate && (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Expected Delivery: {formatDate(currentOrder.deliverDate)}
            </Typography>
          )}
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
