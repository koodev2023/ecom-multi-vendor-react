import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../state/store";

const GridTable = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow = customerHomeCateState.homePageData?.grid;

  return (
    <div>
      <HomeCategoryTable data={itemsToShow || []} />
    </div>
  );
};

export default GridTable;
