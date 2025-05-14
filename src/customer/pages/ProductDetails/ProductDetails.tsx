import {
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import { teal } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchProductById } from "../../../state/customer/customerProductSlice";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../../state/customer/cartSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);
  const { productId } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, []);

  const handleAddToCart = (event: any) => {
    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("access_token") || "",
        request: {
          size: productState.product?.size,
          quantity: quantity,
          productId: productState.product?.id,
        },
      })
    );
  };

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/6 flex flex-wrap lg:flex-col gap-3">
            {productState.product?.images &&
            productState.product?.images.length > 0 ? (
              productState.product?.images.map((image, index) => (
                <img
                  className="lg:w-full w-12 rounded-md cursor-pointer"
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => setActiveImageIndex(index)}
                />
              ))
            ) : (
              <div className="text-center">Images Not Available</div>
            )}
          </div>

          <div className="w-full lg:w-5/6">
            {productState.product?.images &&
            productState.product?.images.length > 0 ? (
              <img
                className="w-full rounded-md"
                src={productState.product?.images[activeImageIndex]}
                alt=""
              />
            ) : (
              <div className="w-full rounded-md bg-gray-200 h-48 flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {productState.product?.seller?.businessDetails?.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">
            {productState.product?.title}
          </p>
          <div className="flex justify-between items-center py-2 border-collapse w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ fontSize: "17px", color: teal[700] }} />
            </div>

            <Divider orientation="vertical" flexItem />

            <span>{productState.product?.numRatings} Ratings</span>
          </div>

          <div>
            <div className="mt-5 flex items-center">
              <span className="text-sm font-medium text-gray-800">
                ${productState.product?.sellingPrice}
              </span>
              <span className="ml-2 text-xs line-through text-gray-500">
                ${productState.product?.mrpPrice}
              </span>
              <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                {productState.product?.discountPercent}% off
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Inclusive of all taxes. Free shipping above $300.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[700] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[700] }} />
              <p>100% Moeny Back Guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[700] }} />
              <p>Fast & Reliable Delivery</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[700] }} />
              <p>Pay on demand might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1 className="text-lg font-semibold">Quantity</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              onClick={handleAddToCart}
            >
              Add To Bag
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              Add To Wishlist
            </Button>
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-semibold">Product Description</h2>
            <p className="mt-2 text-sm text-gray-600">
              {productState.product?.description}
            </p>
          </div>

          <div className="mt-7 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold my-5">Similar Product</h1>
        <SimilarProduct />
      </div>
    </div>
  );
};

export default ProductDetails;
