import { HomeCategorySectionEnum } from "../../api/generated-fetch";

interface HomeCategoryData {
  name: string;
  categoryCode: string;
  section: HomeCategorySectionEnum;
  image: string;
}

export const homeCategories: HomeCategoryData[] = [
  // Section: ELECTRIC_CATEGORIES (Men - 10 Categories)
  {
    name: "T-Shirts",
    categoryCode: "men_topwear_tshirts",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=T-Shirts",
  },
  {
    name: "Casual Shirts",
    categoryCode: "men_topwear_casualshirts",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Casual+Shirts",
  },
  {
    name: "Jeans",
    categoryCode: "men_bottomwear_jeans",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Jeans",
  },
  {
    name: "Casual Trousers",
    categoryCode: "men_bottomwear_casualtrousers",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Casual+Trousers",
  },
  {
    name: "Casual Shoes",
    categoryCode: "men_footwear_casual",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Casual+Shoes",
  },
  {
    name: "Sports Shoes",
    categoryCode: "men_footwear_sports",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Sports+Shoes",
  },
  {
    name: "Sleepwear & Loungewear",
    categoryCode: "men_innerwear_sleepwear",
    section: "ELECTRIC_CATEGORIES",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Sleepwear+%26+Loungewear",
  },
  {
    name: "Sports T-Shirts",
    categoryCode: "men_sportswear_tshirts",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Sports+T-Shirts",
  },
  {
    name: "Wallets",
    categoryCode: "men_accessories_wallets",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Wallets",
  },
  {
    name: "Backpacks",
    categoryCode: "men_bags_backpacks",
    section: "ELECTRIC_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Backpacks",
  },

  // Section: GRID (Women - 10 Categories)
  {
    name: "Tops",
    categoryCode: "women_topwear_tops",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Tops",
  },
  {
    name: "Dresses",
    categoryCode: "women_topwear_dresses",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Dresses",
  },
  {
    name: "Jeans",
    categoryCode: "women_bottomwear_jeans",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Jeans",
  },
  {
    name: "Kurtas & Kurtis",
    categoryCode: "women_ethnic_kurtas",
    section: "GRID",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Kurtas+%26+Kurtis",
  },
  {
    name: "Sarees",
    categoryCode: "women_ethnic_sarees",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Sarees",
  },
  {
    name: "Flats",
    categoryCode: "women_footwear_flats",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Flats",
  },
  {
    name: "Heels",
    categoryCode: "women_footwear_heels",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Heels",
  },
  {
    name: "Bras",
    categoryCode: "women_lingerie_bras",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Bras",
  },
  {
    name: "Handbags",
    categoryCode: "women_bags_handbags",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Handbags",
  },
  {
    name: "Jewellery",
    categoryCode: "women_accessories_jewellery",
    section: "GRID",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Jewellery",
  },

  // Section: SHOP_BY_CATEGORIES (Home & Furniture - 10 Categories)
  {
    name: "Sofas & Sectionals",
    categoryCode: "home_furniture_furniture_sofas",
    section: "SHOP_BY_CATEGORIES",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Sofas+%26+Sectionals",
  },
  {
    name: "Beds & Mattresses",
    categoryCode: "home_furniture_furniture_beds",
    section: "SHOP_BY_CATEGORIES",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Beds+%26+Mattresses",
  },
  {
    name: "Wall Decor",
    categoryCode: "home_furniture_decor_wall",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Wall+Decor",
  },
  {
    name: "Clocks",
    categoryCode: "home_furniture_decor_clocks",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Clocks",
  },
  {
    name: "Bedsheets",
    categoryCode: "home_furniture_bedding_bedsheets",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Bedsheets",
  },
  {
    name: "Pillows & Pillow Covers",
    categoryCode: "home_furniture_bedding_pillows",
    section: "SHOP_BY_CATEGORIES",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Pillows+%26+Pillow+Covers",
  },
  {
    name: "Bath Towels",
    categoryCode: "home_furniture_bath_towels",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Bath+Towels",
  },
  {
    name: "Cookware",
    categoryCode: "home_furniture_kitchen_cookware",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Cookware",
  },
  {
    name: "Dinnerware & Serveware",
    categoryCode: "home_furniture_kitchen_dinnerware",
    section: "SHOP_BY_CATEGORIES",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Dinnerware+%26+Serveware",
  },
  {
    name: "Lamps",
    categoryCode: "home_furniture_lighting_lamps",
    section: "SHOP_BY_CATEGORIES",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Lamps",
  },

  // Section: DEALS (Electronics - 10 Categories)
  {
    name: "Smartphones",
    categoryCode: "electronics_mobiles_smartphones",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Smartphones",
  },
  {
    name: "Laptops",
    categoryCode: "electronics_computers_laptops",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Laptops",
  },
  {
    name: "Televisions",
    categoryCode: "electronics_appliances_tvs",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Televisions",
  },
  {
    name: "Refrigerators",
    categoryCode: "electronics_appliances_refrigerators",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Refrigerators",
  },
  {
    name: "DSLR & Mirrorless Cameras",
    categoryCode: "electronics_cameras_dslr",
    section: "DEALS",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=DSLR+%26+Mirrorless+Cameras",
  },
  {
    name: "Headphones & Earphones",
    categoryCode: "electronics_audio_headphones",
    section: "DEALS",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Headphones+%26+Earphones",
  },
  {
    name: "Bluetooth Speakers",
    categoryCode: "electronics_audio_speakers_bluetooth",
    section: "DEALS",
    image:
      "https://dummyimage.com/150x150/E8E8E8/000000&text=Bluetooth+Speakers",
  },
  {
    name: "Smartwatches",
    categoryCode: "electronics_wearables_smartwatches",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Smartwatches",
  },
  {
    name: "Gaming Consoles",
    categoryCode: "electronics_gaming_consoles",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Gaming+Consoles",
  },
  {
    name: "Power Banks",
    categoryCode: "electronics_mobiles_powerbanks",
    section: "DEALS",
    image: "https://dummyimage.com/150x150/E8E8E8/000000&text=Power+Banks",
  },
];
