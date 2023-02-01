import { getAllItemsWithStats, getItemWithStats, getCustomers, getTransactions, getGeography } from "../controllers/client";
import express from "express";


const ClientRouter = express.Router()

ClientRouter.get('/products/', getItemWithStats)
ClientRouter.get('/products/all', getAllItemsWithStats)
ClientRouter.get('/customers', getCustomers)
ClientRouter.get('/transactions', getTransactions)
ClientRouter.get('/geography', getGeography)

export default ClientRouter