import { ElectricBolt } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import { teal } from "@mui/material/colors";
import type {
  Order,
  OrderItem as OrderItemType,
} from "../../../api/generated-fetch";
import { useNavigate } from "react-router-dom";

const OrderItem = ({
  order,
  orderItem,
}: {
  order: Order;
  orderItem: OrderItemType;
}) => {
  const { product, size, quantity, sellingPrice, mrpPrice } = orderItem;
  const discountPercent = product?.discountPercent ?? 0;
  const hasDiscount = mrpPrice && sellingPrice && mrpPrice > sellingPrice;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/account/order/${order.id}/${orderItem.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer shadow hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[700] }}>
            <ElectricBolt />
          </Avatar>
        </div>

        <div>
          <h1 className="font-bold text-primary-color">PENDING</h1>
          <p className="text-gray-600 text-xs">
            {`Arriving by ${new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(order.deliverDate!))}`}
          </p>
        </div>
      </div>

      <div className="md:flex md:gap-5 items-start p-4 bg-gray-50 rounded">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <img
            className="w-20 h-20 object-cover rounded"
            src={product?.images?.[0] || "https://via.placeholder.com/150"} // Fallback image
            alt={product?.title || "Product image"}
          />
        </div>

        <div className="flex-grow space-y-1">
          <h1 className="font-semibold text-base">
            {product?.title || "Product Title"}
          </h1>
          <p className="text-gray-700 text-xs">
            {product?.description || "Product description not available."}
          </p>
          <div className="flex items-center space-x-2 text-xs">
            {size && (
              <p>
                <span className="font-semibold">Size:</span> {size}
              </p>
            )}
            {quantity && (
              <p>
                <span className="font-semibold">Qty:</span> {quantity}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:ml-auto text-right flex-shrink-0 space-y-1">
          <p className="font-bold text-base">
            ₹{sellingPrice?.toFixed(2) ?? "N/A"}
          </p>
          {hasDiscount && mrpPrice && (
            <>
              <p className="line-through text-gray-500 text-xs">
                ₹{mrpPrice.toFixed(2)}
              </p>
              <Chip
                label={`${discountPercent}% off`}
                size="small"
                color="success"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
