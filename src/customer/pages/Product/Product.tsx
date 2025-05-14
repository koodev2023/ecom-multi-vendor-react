import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../state/customer/customerProductSlice";
import { GetAllProductsRequest } from "../../../api/generated-fetch";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const productState = useAppSelector((state) => state.product);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const minDiscount = searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : undefined;
    const pageNumber = page - 1;
    const newFilter: GetAllProductsRequest = {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      color: color || undefined,
      size: size || undefined,
      minDiscount: minDiscount,
      pageNumber: pageNumber,
      category: category || undefined,
      sort: sort || undefined,
    };

    dispatch(fetchAllProducts(newFilter));
  }, [category, searchParams]);

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-700 pb-5 px-9 uppercase space-x-2">
          {category
            ? category
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "All Products"}
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-1/5">
          <FilterSection />
        </section>

        <div className="w-full lg:w-4/5 space-y-5">
          <div className="flex justify-between items-center px-9 h-10">
            <div className="relative w-1/2">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={handleSortChange}
              >
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />
          <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
            {productState.products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </section>

          <div className="flex justify-center py-10">
            <Pagination
              color="primary"
              count={10}
              variant="outlined"
              onChange={(_e, value) => handlePageChange(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
