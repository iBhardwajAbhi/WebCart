import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../utils/userContext";
import AdminHome from "./AdminHome";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState();
  const [price, setPrice] = useState("ALL");
  const [filter, setFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryCheckboxChange = (categoryId) => {
    const index = selectedCategories.indexOf(categoryId);
    console.log(index);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      setSelectedCategories(updatedCategories);
    }
    // console.log(selectedCategories);
  };

  const getProducts = async () => {
    const res = await axios.get("/api/product/get");
    setProducts(res.data);
  };

  const getCategory = async () => {
    const res = await axios.get("/api/category/get");
    setCategories(res.data);
  };

  useEffect(() => {
    if (price != "ALL") {
      setFilter(true);
      setFilteredProducts(null);
      setFilteredProducts(
        products.filter((item) => {
          if (price === "LOW") {
            return item.price < 1000;
          } else if (price === "MID") {
            return item.price < 10000 && item.price > 999;
          } else {
            return item.price > 9999;
          }
        })
      );
    } else {
      setFilter(false);
    }
  }, [price]);

  useEffect(() => {
    const usr = localStorage.getItem("user");
    setUser(JSON.parse(usr));
    getProducts();
    getCategory();
  }, []);

  return (
    <div>
      {user && user.role == 1 ? (
        <AdminHome />
      ) : (
        <div>
          {products ? (
            <div className="home">
              <div className="left col-span-1">
                <div id="filters">
                  <h1>Filters</h1>
                  <div>
                    All range :
                    <input
                      type="radio"
                      name="price"
                      value="ALL"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      id=""
                    />
                  </div>
                  <div>
                    below 1000 :
                    <input
                      type="radio"
                      name="price"
                      value="LOW"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      id=""
                    />
                  </div>
                  <div>
                    1000 to 9999 :
                    <input
                      type="radio"
                      name="price"
                      value="MID"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      id=""
                    />
                  </div>
                  <div>
                    10000 & above :
                    <input
                      type="radio"
                      name="price"
                      value="HIGH"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      id=""
                    />
                  </div>
                </div>
                <div id="categories">
                  <h1>Categories</h1>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <div>
                          {item.name}
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(item._id)}
                            onChange={() =>
                              handleCategoryCheckboxChange(item._id)
                            }
                            value={item._id}
                            name=""
                            id=""
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="right flex flex-row col-span-2">
                {filter ? (
                  filteredProducts ? (
                    filteredProducts.map((item) => {
                      return selectedCategories.length !== 0 ? (
                        selectedCategories.includes(item.category) && (
                          <ProductCard data={item} />
                        )
                      ) : (
                        <ProductCard data={item} />
                      );
                    })
                  ) : (
                    <div>no product in given price range</div>
                  )
                ) : selectedCategories.length !== 0 ? (
                  products.map((item) => {
                    return (
                      selectedCategories.includes(item.category) && (
                        <ProductCard data={item} />
                      )
                    );
                  })
                ) : (
                  products.map((item) => {
                    return <ProductCard data={item} />;
                  })
                )}
              </div>
            </div>
          ) : (
            <div>0 products found ...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
