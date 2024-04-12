import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();
  const [categories, setCategories] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [products, setProducts] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getCategory = async () => {
    const res = await axios.get("/api/category/get");
    setCategories(res.data);
  };

  // const imageUploadHandler = async () => {
  //   let formData = new FormData();
  //   const url = `https://api.cloudinary.com/v1_1/degrefreq/image/upload`;
  //   formData.append("file", image);
  //   formData.append("upload_preset", "socialmedia");

  //   axios
  //     .post(url, formData)
  //     .then((res) => {
  //       setImageUrl(res.data.url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleSubmit = async () => {
  //   console.log("submin called");
  //   await imageUploadHandler().then(() => {
  //     return axios
  //       .post(
  //         "/api/product/create",
  //         { name, description: desc, photo: imageUrl, price, category },
  //         { headers: { authorization: token } }
  //       )
  //       .then(() => {
  //         getProducts();
  //       });
  //   });

  //   //  console.log(imageUrl)
  //   //  console.log(category)
  // };

  const imageUploadHandler = () => {
    let formData = new FormData();
    const url = `https://api.cloudinary.com/v1_1/degrefreq/image/upload`;
    formData.append("file", image);
    formData.append("upload_preset", "socialmedia");

    return axios
      .post(url, formData)
      .then((res) => {
        // setImageUrl(res.data.url);
        return res.data.url;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Re-throw the error to propagate it
      });
  };

  const handleSubmit = () => {
    console.log("submit called");
    imageUploadHandler()
      .then((url) => {
        return axios.post(
          "/api/product/create",
          { name, description: desc, photo: url, price, category },
          { headers: { authorization: token } }
        );
      })
      .then(() => {
        getProducts();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteProduct = async (id) => {
    const res = await axios.delete("/api/product/delete", {
      headers: { authorization: token },
      data: { id },
    });
    console.log(res.data);
    getProducts();
  };

  const getProducts = async () => {
    const res = await axios.get("/api/product/get");
    setProducts(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  return (
    <div>
      <div className="login-form">
        CreateProduct
        <label htmlFor="">Name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
        />
        <label htmlFor="">Description</label>
        <textarea
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          id=""
          cols="30"
          rows="4"
        ></textarea>
        <label htmlFor="">Price</label>
        <input
          type="text"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <label htmlFor="">Category</label>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          id=""
        >
          <option disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {categories &&
            categories.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="">Upload product image</label>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="right">
        {products ? (
          products.map((item) => {
            return (
              <div className="card">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <h2>price : {item.price}</h2>
                <img src={item.photo} width="50px" alt="" srcset="" />

                <button
                  onClick={() => {
                    deleteProduct(item._id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <div>0 products found</div>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
