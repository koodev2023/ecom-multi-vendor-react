export interface Level3Category {
  name: string;
  categoryCode: string;
  parentCategoryCode: string;
  level: 3; // Use literal type 3
}

export interface Level2Category {
  name: string;
  categoryCode: string;
  parentCategoryCode: string;
  level: 2; // Use literal type 2
  levelThreeCategory?: Level3Category[]; // Array of Level 3, optional
}

export interface Level1Category {
  name: string;
  categoryCode: string;
  level: 1; // Use literal type 1
  levelTwoCategory?: Level2Category[]; // Array of Level 2, optional
}

export interface CategorySheetProps {
  levelTwoCategories: Level2Category[]; // Expecting an array of Level 2 categories
}
