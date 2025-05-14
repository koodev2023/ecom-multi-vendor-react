// src/components/CategorySheet.tsx
import React from "react";
import { CategorySheetProps } from "../../../types/category";
import { useNavigate } from "react-router-dom";

const CategorySheet: React.FC<CategorySheetProps> = ({
  levelTwoCategories,
}) => {
  const navigate = useNavigate();

  // Handle empty case
  if (!levelTwoCategories || levelTwoCategories.length === 0) {
    return null; // Or render a placeholder if needed
  }

  return (
    // Added padding, background, shadow, max-height, and overflow control
    <div className="bg-white shadow-lg max-h-[500px] lg:max-h-[calc(100vh-150px)] overflow-y-auto p-6 border border-t-0">
      {/* Use flexbox to arrange Level 2 categories in columns */}
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-6">
        {/* Added gap */}
        {levelTwoCategories.map((level2) => (
          // Each Level 2 category gets its own column/section
          // Adjust width (e.g., w-1/4, w-1/5) or use min-width as needed
          <div
            key={level2.categoryCode}
            className="flex flex-col min-w-[180px]"
          >
            {/* Column for L2 */}
            <h3
              // onClick={() => navigate(`/products/${level2.categoryCode}`)}
              className="font-semibold text-sm text-primary-color mb-2"
            >
              {level2.name}
            </h3>
            {/* List Level 3 categories under the Level 2 heading */}
            {level2.levelThreeCategory &&
              level2.levelThreeCategory.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {/* Vertical list for L3 */}
                  {level2.levelThreeCategory.map((level3) => (
                    <li
                      onClick={() =>
                        navigate(`/products/${level3.categoryCode}`)
                      }
                      key={level3.categoryCode}
                      className="text-sm text-gray-600 hover:text-primary-color cursor-pointer"
                    >
                      {level3.name}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySheet;
