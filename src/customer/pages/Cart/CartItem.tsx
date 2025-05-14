import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import type { CartItem as CartItemType } from "../../../api/generated-fetch";
import { useAppDispatch } from "../../../state/store";
import { updateCartItem } from "../../../state/customer/cartSlice";

const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => {
    dispatch(
      updateCartItem({
        cartItemId: item.id!,
        quantity: item.quantity! + value,
        jwt: localStorage.getItem("access_token") || "",
      })
    );
  };

  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        {item.product?.images && item.product?.images.length > 0 && (
          <div>
            <img
              className="w-24 rounded-md"
              src={item.product?.images[0]}
              alt=""
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{item.product?.title}</h1>
          <p className="text-gray-600 font-medium text-sm">
            {item.product?.description}
          </p>
          <p className="text-gray-600 text-xs">
            <strong>Sold By: </strong>
            {item.product?.seller?.businessDetails?.businessName}
          </p>
          <p className="text-gray-600 text-sm">7 days return policy.</p>
          <p className="text-sm text-gray-600">
            <strong>Quantity: </strong>
            {item.quantity}
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button
              onClick={() => handleUpdateQuantity(-1)}
              disabled={item.quantity === 1}
            >
              <Remove />
            </Button>
            <span>{item.quantity}</span>
            <Button onClick={() => handleUpdateQuantity(+1)}>
              <Add />
            </Button>
          </div>
        </div>

        <div className="pr-5">
          <p className="text-gray-700 font-medium">${item.sellingPrice}</p>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <IconButton color="primary">
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
