export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: [];
  role: ["user", "admin", "superadmin"];
};

export type ProductType = {
  _doc: any;
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  supply: number;
  stats: {
    monthlyData: [
      {
        month: String;
        totalSales: number;
        totalUnits: number;
      }
    ];
    dailyData: [
      {
        month: String;
        totalSales: number;
        totalUnits: number;
      }
    ];
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
  };
  updatedAt: string;
  __v: number;
  _id: string;
};

export type TransactionType = {
  _id: string;
  userId: string;
  cost: number;
  products: string[];
};
export type TransactionApiRes = {
  tList: Array<TransactionType>;
  total: number;
};
export type TransactionApiParams = {
  page: number;
  pageSize: number;
  sort: { field: string; sort: string };
  search: string;
};

export type GeoEntry = {
  id: string;
  count: number;
}

type MonthlyData = {
  _id: string;
  month: string;
  totalSales: number;
  totalUnits: number;
};
type DailyData = {
  date: string;
  month: string;
  totalSales: number;
  totalUnits: number;
};

type SalesByCategory = {
  shoes: number;
    clothing: number;
    accesssories: number;
    misc: number;
}

export type YearlyStat = {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: Array<MonthlyData>;
  dailyData: Array<DailyData>;
  salesByCategory: SalesByCategory
};

export type DashboardApiRes = {
  currentMonthStats: MonthlyData;
  monthlyData: Array<MonthlyData>;
  salesByCategory: SalesByCategory;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  transactions: TransactionType[];
  todaysStats: DailyData
}