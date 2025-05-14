import React from "react";
import { Deal } from "../../../../api/generated-fetch";

const DealCard = ({ item }: { item: Deal }) => {
  return (
    <div className="w-[13rem] cursor-pointer">
      <img
        className="border-x-8 border-t-8 border-pink-600 w-full h-[12rem] object-cover object-top"
        src={item.category?.image}
        alt="watch"
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center">
        <p className="text-lg font-semibold">{item.category?.name}</p>
        <p className="text-2xl font-bold">{item.discount}% OFF</p>
        <p className="text-lg">Shop Now</p>
      </div>
    </div>
  );
};

export default DealCard;
