import { dashboard, expenses, transactions, trend } from "./Icons";

export const menuItems = [
  {
    id: 1,
    title: "게시판",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "거래 보기",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "수입",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "지출",
    icon: expenses,
    link: "/dashboard",
  },
];
