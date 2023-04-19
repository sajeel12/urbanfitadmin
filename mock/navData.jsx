// import DashboardIcon from "../public/sidebaricons/Dashboardicon.jsx";
import { Dashboardicon } from "@/public/sidebaricons/Dashboardicon";
import { Vendoricon } from "@/public/sidebaricons/Vendoricon";
import React from "react";

export const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <Dashboardicon/>,
    navlink: "/admin",
  },
  {
    id: 2,
    label: "Products",
    icon: <Vendoricon/>,
    navlink: "/admin",
    expanded: false,
    subrows: [
      {
        label: "All Products",

        navlink: "/admin",
      },
      {
        label: "Addnew",

        navlink: "/admin",
      },
      {
        label: "All Products",

        navlink: "/admin",
      },
      {
        label: "Tags",

        navlink: "/admin",
      },
      {
        label: "Attributes",

        navlink: "/admin",
      },
    ],
  },
  {
    id: 3,
    label: "Categories",
    icon: <Dashboardicon/>,
    navlink: "/admin",
    expanded: false,
    subrows: [
      {
        label: "All Products",

        navlink: "/admin",
      },
      {
        label: "Addnew",

        navlink: "/admin",
      },
    ],
  },
];
