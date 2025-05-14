import { HomeCategory } from "../../../../api/generated-fetch";

const ElectricCategoryCard = ({ item }: { item: HomeCategory }) => {
  return (
    <div className="flex flex-col h-full gap-0.5 justify-center items-center text-center border rounded-md">
      <img className="object-contain h-10" src={item.image} alt={item.name} />
      <h2 className="font-semibold text-sm">{item.name}</h2>
    </div>
  );
};

export default ElectricCategoryCard;
