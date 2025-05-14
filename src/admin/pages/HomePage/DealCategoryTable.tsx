import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../state/store";

const DealCategoryTable = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow = customerHomeCateState.homePageData?.dealCategories;

  return (
    <div>
      <HomeCategoryTable data={itemsToShow || []} />
    </div>
  );
};

export default DealCategoryTable;
