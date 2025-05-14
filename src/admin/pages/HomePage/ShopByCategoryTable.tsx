import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../state/store";

const ShopByCategoryTable = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow = customerHomeCateState.homePageData?.shopByCategories;

  return (
    <div>
      <HomeCategoryTable data={itemsToShow || []} />
    </div>
  );
};

export default ShopByCategoryTable;
