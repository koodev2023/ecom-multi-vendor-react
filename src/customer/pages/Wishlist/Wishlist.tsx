import React, { useEffect } from "react";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getUserWishlist } from "../../../state/customer/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(
      getUserWishlist({ jwt: localStorage.getItem("access_token") || "" })
    );
  }, []);

  const products = wishlist.wishlist?.products
    ? Array.from(wishlist.wishlist.products)
    : [];

  return (
    <div className="h-5/6 p-5 lg:p-20">
      <section>
        <h1>
          <strong>My Wishlist</strong> ({products.length} items)
        </h1>

        <div className="pt-10 flex flex-wrap gap-5">
          {products.map((product) => (
            <WishlistProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
