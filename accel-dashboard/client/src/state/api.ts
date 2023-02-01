import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductType,
  UserType,
  TransactionType,
  TransactionApiParams,
  GeoEntry,
  YearlyStat,
} from "./types";

export declare interface ProductApiRes extends Array<ProductType> {}
export declare interface CustomerApiRes extends Array<UserType> {}
export declare interface TransactionApiRes extends Array<{}> {
  tList: Array<TransactionType>;
  total: number;
}

export const Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id: string) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getCustomers: build.query<Array<UserType>, {}>({
      query: () => `client/customers`,
      providesTags: ["Customers"],
      transformResponse: (rawResult: unknown) =>
        arrayTransform<UserType>(rawResult),
    }),
    getAllItems: build.query<Array<ProductType>, {}>({
      query: () => `client/products/all`,
      providesTags: ["Products"],
      transformResponse: (rawResult: unknown) =>
        arrayTransform<ProductType>(rawResult),
    }),
    getTransactions: build.query<TransactionApiRes, {}>({
      query: ({ page, pageSize, sort, search }: TransactionApiParams) => ({
        method: "GET",
        url: `client/transactions`,
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
      transformResponse: (rawResult: unknown) => TransactionResponse(rawResult),
    }),
    getGeography: build.query<Array<GeoEntry>, {}>({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query<YearlyStat, {}>({
      query: () =>  `sales/sales`,
      providesTags: ["Sales"],
    })
  }),
});

const TransactionResponse = (rawResult: unknown) => {
  let raw = rawResult as Object;
  let res = {} as TransactionApiRes;
  let transactions = [];
  let total;

  if (typeof rawResult === "object") {
    transactions = Object.values(raw)[0];
    total = Object.values(raw)[1];
    res.tList = transactions;
    res.total = total;

    console.log("Transaction result from api:", res);
  }
  return res as TransactionApiRes;
};

const arrayTransform = <T>(rawResult: unknown) => {
  let res = rawResult as Object;

  if (typeof rawResult === "object") {
    res = Object.values(res);
    console.log("result from api:", res);
  }
  return rawResult as Array<T>; // Inferred type is T[K]
};

export const {
  useGetUserQuery,
  useGetCustomersQuery,
  useGetAllItemsQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery
} = Api;
