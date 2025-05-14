import DealCard from "./DealCard";
import { useAppSelector } from "../../../../state/store";

const Deal = () => {
  const customerHomeCateState = useAppSelector((s) => s.customerHomeCategory);
  const itemsToShow =
    customerHomeCateState.homePageData?.deals?.slice(0, 6) || [];

  return (
    <div className="py-5 lg:px-20 overflow-hidden">
      <div className="flex flex-row gap-4 items-center overflow-x-auto pb-4">
        {itemsToShow.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-64">
            <DealCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deal;
