import React, { useState } from "react";

import ManageCategories from "./ManageCategories";
import ManageOrders from "./ManageOrders";
import ManageProduct from "./ManageProduct";

const AdminHome = () => {
  const [menu, setMenu] = useState(1);

  return (
    <div>
      <div className="admin-menu">
        <button
          onClick={() => {
            setMenu(1);
          }}
        >
          Manage Products
        </button>
        <button
          onClick={() => {
            setMenu(2);
          }}
        >
          Manage Categories
        </button>
        <button
          onClick={() => {
            setMenu(3);
          }}
        >
          Manage Orders
        </button>
      </div>
      <>
        {(() => {
          switch (menu) {
            case 1:
              return <ManageProduct />;
              break;
            case 2:
              return <ManageCategories />;
              break;
            case 3:
              return <ManageOrders />;
          }
        })()}
      </>
    </div>
  );
};

export default AdminHome;
