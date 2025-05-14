import React from "react";
import "./ShopByCategory.css";
import { HomeCategory } from "../../../../api/generated-fetch";

const ShopByCategoryCard = ({ item }: { item: HomeCategory }) => {
  return (
    <div className="flex gap-3 flex-col justify-center items-center group cursor-pointer">
      <div className="custom-border w-[150px] h-[150px] lg:w-[240px] lg:h-[240px] rounded-full bg-primary-color">
        <img
          className="rounded-full group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full"
          src={item.image}
          alt={item.name}
        />
      </div>
      <h1>{item.name}</h1>
    </div>
  );
};

export default ShopByCategoryCard;
