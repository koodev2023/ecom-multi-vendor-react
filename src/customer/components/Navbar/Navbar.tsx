import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";
import {
  FavoriteBorder,
  Person2,
  ShoppingCartOutlined,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { Level1Category } from "../../../types/category";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/store";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const [hoveredCategoryCode, setHoveredCategoryCode] = useState<string | null>(
    null
  );
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategoryData = mainCategory.find(
    (cat) => cat.categoryCode === hoveredCategoryCode
  );

  const handleMouseEnter = (categoryCode: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategoryCode(categoryCode);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategoryCode(null);
    }, 150);
  };

  const handleSheetMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleSheetMouseLeave = () => {
    setHoveredCategoryCode(null);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <div className="flex justify-between items-center px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton>
                <MenuIcon />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg md:text-2xl text-emerald-700"
            >
              E Commerce
            </h1>
          </div>

          {/* Categories - Desktop */}
          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((category: Level1Category) => (
                <li
                  onClick={() => {
                    handleMouseLeave();
                    // return navigate(`/products/${category.categoryCode}`);
                  }}
                  key={category.categoryCode}
                  className="flex items-center hover:text-primary-color cursor-pointer hover:border-b-2 h-[70px] px-4 border-primary-color"
                  onMouseEnter={() => handleMouseEnter(category.categoryCode)}
                  onMouseLeave={handleMouseLeave} // Leave handler on the button
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section */}
        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton>
            <SearchIcon />
          </IconButton>
          {auth.isLoggedIn && auth.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar sx={{ width: 30, height: 30 }}>
                <Person2
                  sx={{ fontSize: 20, color: "white" }}
                  className="text-gray-700"
                />
              </Avatar>
              <h1 className="font-semibold hidden lg:block">
                {auth.user?.firstName} {auth.user?.lastName}
              </h1>
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} variant="contained">
              Login
            </Button>
          )}
          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorder className="text-gray-700" sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton onClick={() => navigate("/cart")}>
            <ShoppingCartOutlined
              className="text-gray-700"
              sx={{ fontSize: 30 }}
            />
          </IconButton>
          {isLarge && (
            <Button
              startIcon={<Storefront />}
              onClick={() => navigate("/become-seller")}
              variant="outlined"
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>
      {isLarge &&
        hoveredCategoryCode &&
        activeCategoryData?.levelTwoCategory && (
          <div
            className="categorySheet absolute top-[71px] left-0 right-0 z-50"
            onMouseEnter={handleSheetMouseEnter}
            onMouseLeave={handleSheetMouseLeave}
          >
            <CategorySheet
              levelTwoCategories={activeCategoryData.levelTwoCategory || []}
            />
          </div>
        )}
    </Box>
  );
};

export default Navbar;
