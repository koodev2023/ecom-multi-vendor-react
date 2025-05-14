import { Product } from "../../../api/generated-fetch";
import { addProductToWishlist } from "../../../state/customer/wishlistSlice";
import { useAppDispatch } from "../../../state/store";

const WishlistProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (productId?: number) => {
    if (productId) {
      dispatch(
        addProductToWishlist({
          jwt: localStorage.getItem("access_token") || "",
          productId: productId,
        })
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs mx-auto relative group">
      <button
        onClick={() => handleRemoveFromWishlist(product.id)}
        className="absolute top-2 right-2 z-10 bg-white bg-opacity-75 hover:bg-opacity-100 text-red-500 hover:text-red-700 rounded-full p-1.5 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Remove from wishlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full h-48">
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/300x200.png?text=No+Image"
          }
          alt={product.title || "Product image"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 mb-1 truncate"
          title={product.title || "Unnamed Product"}
        >
          {product.title || "Unnamed Product"}
        </h3>

        <div className="flex items-baseline mb-2">
          {product.sellingPrice && (
            <p className="text-xl font-bold text-indigo-600 mr-2">
              ${product.sellingPrice.toFixed(2)}
            </p>
          )}
          {product.mrpPrice &&
            product.sellingPrice &&
            product.mrpPrice > product.sellingPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.mrpPrice.toFixed(2)}
              </p>
            )}
        </div>

        {product.discountPercent && product.discountPercent > 0 && (
          <p className="text-xs text-green-600 font-semibold mb-2">
            ({product.discountPercent.toFixed(0)}% off)
          </p>
        )}

        {(product.size || product.color) && (
          <div className="text-xs text-gray-500 mt-1">
            {product.size && <span className="mr-2">Size: {product.size}</span>}
            {product.color && <span>Color: {product.color}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
