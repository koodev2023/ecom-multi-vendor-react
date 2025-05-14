import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../state/store";

const ElectronicTable = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow = customerHomeCateState.homePageData?.electricCategories;

  return (
    <div>
      <HomeCategoryTable data={itemsToShow || []} />
    </div>
  );
};

export default ElectronicTable;
