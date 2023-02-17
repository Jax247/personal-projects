import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
  Rating,
} from "@mui/material";
import { Header } from "../../components";
import { ProductApiRes, useGetAllItemsQuery } from "../../state/api";
import ProductCard from "./ProductCard";
import { ProductType } from "../../state/types";
import SortSelect from "./Select";
import Loader from "../../Loader";

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}
let initialSort = { category: "price", ascending: false };
let a = [] as ProductType[];

const sortProducts = (
  data: Array<ProductType>,
  category: string,
  ascending: boolean
) => {
  console.log("Data Pre sort", data);

  const sorted = [...data].sort((a: ProductType, b: ProductType) => {
    return (
      getProperty(a, category as keyof ProductType) -
      getProperty(b, category as keyof ProductType)
    );
  });
  sorted.reverse();

  console.log("sorted", sorted);

  return sorted;
};

const Products: React.FC = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { data, isLoading, error } = useGetAllItemsQuery("Product");
  const [sortedBy, setSortedBy] = useState("price");
  const [productList, setproductList] = useState(a);

  const init = () => {
    // Sort Products then set list
    let newArr = [] as ProductType[];

    if (!isLoading) {

      newArr = sortProducts([...data as Array<ProductType>], sortedBy, false);
    }
    setproductList(newArr);

    console.log("Product List after set", productList);
  };

  useEffect(() => init(), [data, sortedBy]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return null;
  }

  return (
    <div className="main-content-wrapper">
      <Box>
        <Header title="Products" subtitle="List of Products" />

        <SortSelect sortBy={sortedBy} changeSort={setSortedBy} />
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap={"20px"}
          columnGap="1.3%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {productList.map((item) => (
            <ProductCard key={item._id} data={item} />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Products;
