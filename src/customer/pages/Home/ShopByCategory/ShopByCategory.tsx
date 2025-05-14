import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../state/store";

const ShopByCategory = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow = customerHomeCateState.homePageData?.shopByCategories;

  return (
    <div className="flex flex-wrap justify-between lg:px-20 gap-7">
      {itemsToShow &&
        itemsToShow.map((item, index) => (
          <ShopByCategoryCard key={`${item}_${index}`} item={item} />
        ))}
    </div>
  );
};

export default ShopByCategory;
