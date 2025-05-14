import React from "react";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-2 gap-y-4">
      {[...Array(10)].map((_, index) => (
        <SimilarProductCard key={index} />
      ))}
    </div>
  );
};

export default SimilarProduct;
