import { useAppSelector } from "../../../../state/store";
import ElectricCategoryCard from "./ElectricCategoryCard";

const ElectricCategory = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow =
    customerHomeCateState.homePageData?.electricCategories?.slice(0, 7) || [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 py-5 lg:px-20 border-b">
      {itemsToShow.map((item) => (
        <div key={item.id}>
          <ElectricCategoryCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ElectricCategory;
