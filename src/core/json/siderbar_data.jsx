import React from 'react';

import { FiGrid, FiSmartphone } from "react-icons/fi";

export const SidebarData = [

  {
    label: "メイン機能",
    submenuOpen: true,
    showSubRoute: true,
    submenuHdr: "Main",
    submenuItems: [
      {
        label: "マイ ダッシュボード",
        icon: <FiGrid />,
        submenu: false,
        showSubRoute: false,
        link: "/dashboard"
      },
      {
        label: "メイン機能",
        icon: <FiSmartphone />,
        submenu: true,
        showSubRoute: true,
        submenuItems: [
          {
            label: "商品情報調査", link: "/research", showSubRoute: false,
          },
          {
            label: "出品中商品", link: "/items-sale-management", showSubRoute: false,
          },
          {
            label: "納品管理", submenu: false, link: "/delivery-management"
          },
          {
            label: "記録管理", link: "/history", showSubRoute: false,
          },
          {
            label: "在庫補充", link: "/restock-inventory", showSubRoute: false,
          },
          {
            label: "FBA 注文", link: "/fba-product-order", showSubRoute: false,
          },
          {
            label: "設定", link: "/settings", showSubRoute: false,
          },
          
        ]
      }
    ]
  },
  
]
