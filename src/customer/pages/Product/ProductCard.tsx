import React, { useEffect, useRef, useState, useCallback } from "react";
import "./ProductCard.css";
import { Product } from "../../../api/generated-fetch";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../state/store";
import { addProductToWishlist } from "../../../state/customer/wishlistSlice";

const HeartIcon = ({
  className = "",
  isFavorite = false,
}: {
  className?: string;
  isFavorite?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill={isFavorite ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const useImageSlideshow = (
  images: string[],
  intervalDuration: number = 2000
) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (isHovering && images.length > 1) {
      setCurrentImageIndex(images.length > 1 ? 1 : 0);

      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, intervalDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, images, intervalDuration]);

  const handleMouseEnter = useCallback(() => {
    if (images.length > 1) {
      setIsHovering(true);
    }
  }, [images.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const getTransformStyle = useCallback(
    (index: number) => {
      if (index === currentImageIndex) {
        return "translateX(0%)";
      } else if (index < currentImageIndex) {
        return "translateX(-100%)";
      } else {
        return "translateX(100%)";
      }
    },
    [currentImageIndex]
  );

  return {
    currentImageIndex,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    getTransformStyle,
  };
};

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
}

const ProductCard = ({ product, isFavorite = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const images = product.images || [];
  const {
    currentImageIndex,
    handleMouseEnter,
    handleMouseLeave,
    getTransformStyle,
  } = useImageSlideshow(images, 2000);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("onFavoriteToggle clicked");
    product.id &&
      dispatch(
        addProductToWishlist({
          productId: product.id,
          jwt: localStorage.getItem("access_token") || "",
        })
      );
  };

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number") return "";
    return `$${price.toFixed(2)}`;
  };

  return (
    <div
      className={`group relative w-min cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        navigate(
          `/product-details/${product.category?.id}/${product.title}/${product.id}`
        );
      }}
    >
      {product.id && (
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-10 p-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:bg-white"
        >
          <HeartIcon
            className={`hover:text-red-500 ${
              isFavorite ? "text-red-500" : "text-gray-700"
            }`}
            isFavorite={isFavorite}
          />
        </button>
      )}
      <div className="card relative overflow-hidden">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              className="card-media object-top absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: getTransformStyle(index) }}
              src={image}
              alt={`${product.title || "Product"} view ${index + 1}`}
              loading="lazy"
            />
          ))
        ) : (
          <div className="aspect-square w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
        <div className="aspect-square w-full"></div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {product.seller?.businessDetails?.businessName || "Seller Name"}
      </div>
      <div
        className="text-lg font-semibold tracking-tight text-gray-900 truncate"
        title={product.title}
      >
        {" "}
        {product.title || "Product Name"}
      </div>
      <div className="mt-1 flex items-center flex-wrap">
        {" "}
        <span className="text-sm font-medium text-gray-800">
          {formatPrice(product.sellingPrice)}
        </span>{" "}
        {product.mrpPrice &&
          product.sellingPrice &&
          product.mrpPrice > product.sellingPrice && (
            <span className="ml-2 text-xs line-through text-gray-500">
              {formatPrice(product.mrpPrice)}
            </span>
          )}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700 whitespace-nowrap">
            {product.discountPercent}% off
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
