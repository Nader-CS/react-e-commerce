import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./AddProducts.module.scss";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { GiConfirmed } from "react-icons/gi";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  imageUrl: null,
  firebaseImageUrl: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setImageUrl":
      return { ...state, imageUrl: action.payload };
    case "setPrice":
      return { ...state, price: action.payload };
    case "setCategory":
      return { ...state, category: action.payload };
    case "setBrand":
      return { ...state, brand: action.payload };
    case "setDesc":
      return { ...state, desc: action.payload };
    case "setFirbaseImageUrl":
      return { ...state, firebaseImageUrl: action.payload };
    case "reset":
      return initialState;
    case "setState":
      return action.payload;
    default:
      return state;
  }
};

const category = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProducts = () => {
  const getProducts = useSelector((state) => state.products.products);
  const userId = useSelector((state) => state.auth.userId);
  const inputRef = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAddSuccessfully, setIsAddSuccessfully] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const addProductHandler = (e) => {
    e.preventDefault();
    setIsAddSuccessfully(false);
    if (uploadProgress < 100) {
      toast.error("wait until image upload");
      return;
    }
    if (products.price <= 0) {
      toast.error("Price cannot be zero or less");
      return;
    }
    setIsLoading(true);
    try {
      const collRef = collection(db, "products");
      const filteredProducts = { ...products };
      delete filteredProducts.imageUrl;
      const docRef = addDoc(collRef, {
        ...filteredProducts,
        price: Number(filteredProducts.price),
        createdAt: Timestamp.now().toDate(),
        createdById: userId,
      }).then(() => {
        setIsAddSuccessfully(true);
        setIsLoading(false);
        toast.success("added Successfully");
        setUploadProgress(0);
        dispatch({ type: "reset" });
        navigate("/admin/all-products");
      });
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };
  const setImageHandler = (e) => {
    try {
      dispatch({ type: "setImageUrl", payload: e.target.files[0] });
      const file = e.target.files[0];
      const storageRef = ref(storage, `eShop/${Date.now()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(error.message);
          console.log("error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            dispatch({ type: "setFirbaseImageUrl", payload: downloadURL });
          });
        }
      );
    } catch (e) {
      toast.error("Something went error");
    }
  };

  const detectForm = (id, state1, state2) => {
    if (id == "new") {
      return state1;
    }
    return state2;
  };

  const { id } = useParams();
  let editedProduct = getProducts.find((product) => product.id == id);
  const [products, dispatch] = useReducer(reducerFunction, initialState, () => {
    //this initializtion function used to return initial state based on id on the URL
    const newState = detectForm(id, { ...initialState }, editedProduct);
    console.log(newState);
    return newState;
  });
  //this useEffuect used to reset inputs in the form
  useEffect(() => {
    if (id == "new") {
      dispatch({ type: "reset" });
      setUploadProgress(0);
      inputRef.current.value = "";
    }
  }, [id]);
  const resetButtonHandler = () => {
    if (id != "new") {
      dispatch({ type: "setState", payload: editedProduct });
      return;
    }
    if (uploadProgress > 0 && uploadProgress <= 99) {
      return;
    }
    setUploadProgress(0);
    setIsAddSuccessfully(false);
    dispatch({ type: "reset" });
  };
  const editProdutHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(editedProduct);
    try {
      let docRef = doc(db, "products", id);
      const createdAt = new Date(products.createdAt);
      const eProduct = { ...products };
      delete eProduct.imageUrl;
      console.log(products.firebaseImageUrl, eProduct.firebaseImageUrl);
      if (products.firebaseImageUrl != editedProduct.firebaseImageUrl) {
        const desertRef = ref(storage, editedProduct.firebaseImageUrl);
        deleteObject(desertRef).then(() => {
          console.log("Deleted");
        });
      }
      setDoc(docRef, {
        ...eProduct,
        createdAt: Timestamp.fromDate(createdAt),
        editedAt: Timestamp.now().toDate(),
      }).then(() => {
        setIsLoading(false);
        toast.success("Product Edited Completed");
        navigate("/admin/all-products");
      });
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };
  console.log(products);
  return (
    <>
      {isLoading && <Loader />}
      <div className={classes["add-product-container"]}>
        <h3 className={classes["form-header"]}>
          {detectForm(id, "Add new Product", "Edit product")}
        </h3>
        {isAddSuccessfully && (
          <p className={classes["added-successfully"]}>
            Added Successfully <GiConfirmed className={classes["confirm"]} />
          </p>
        )}
        <div>
          <form
            className={classes.form}
            onSubmit={detectForm(id, addProductHandler, editProdutHandler)}
          >
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product name :</label>
              <input
                className={classes.input}
                type="text"
                placeholder="Product name"
                required
                value={products.name}
                name="name"
                onInput={(e) => {
                  dispatch({ type: "setName", payload: e.target.value });
                }}
              />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product image:</label>
              <div className={classes["progressbae-container"]}>
                {uploadProgress > 0 && (
                  <div className={classes["progressbar"]}>
                    <div
                      className={classes["progressbar-content"]}
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress.toFixed(2)}%`
                        : `Upload Completed ${uploadProgress}%`}
                    </div>
                  </div>
                )}
                <input
                  className={classes.input}
                  type="file"
                  accept="image/*"
                  placeholder="product image"
                  name="image"
                  onInput={setImageHandler}
                  required={detectForm(id, true, false)}
                  ref={inputRef}
                />
                {products.firebaseImageUrl && (
                  <input
                    type="text"
                    required
                    name="imageUrl"
                    disabled
                    placeholder="Image url"
                    value={products.firebaseImageUrl}
                    className={classes.input}
                  />
                )}
              </div>
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product price :</label>
              <input
                className={classes.input}
                type="number"
                placeholder="Product price"
                required
                value={products.price}
                name="price"
                onInput={(e) => {
                  dispatch({ type: "setPrice", payload: e.target.value });
                }}
              />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product category :</label>
              <select
                className={classes.select}
                required
                name="category"
                value={products.category}
                onChange={(e) => {
                  dispatch({ type: "setCategory", payload: e.target.value });
                }}
              >
                <option value="" disabled>
                  -- Choose product category --
                </option>
                {category.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product Company/Brand :</label>
              <input
                className={classes.input}
                type="text"
                placeholder="Product Company/Brand"
                required
                value={products.brand}
                name="brand"
                onInput={(e) => {
                  dispatch({ type: "setBrand", payload: e.target.value });
                }}
              />
            </div>
            <div className={classes["input-container"]}>
              <label className={classes.label}>Product Description :</label>
              <textarea
                className={classes.textarea}
                required
                name="description"
                value={products.desc}
                cols="30"
                rows="10"
                onInput={(e) => {
                  dispatch({ type: "setDesc", payload: e.target.value });
                }}
              />
            </div>
            {id != "new" && (
              <div className={classes["input-container"]}>
                <label className={classes.label}>Created At</label>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="Product Company/Brand"
                  disabled
                  value={new Date(products.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short",
                  })}
                />
              </div>
            )}
            {id != "new" && products.editedAt && (
              <div className={classes["input-container"]}>
                <label className={classes.label}>Edited At</label>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="Product Company/Brand"
                  disabled
                  value={new Date(products.editedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short",
                  })}
                />
              </div>
            )}
            <div className={classes["button-container"]}>
              <button
                className={classes["reset-button"]}
                onClick={resetButtonHandler}
                type="reset"
                disabled={uploadProgress > 0 && uploadProgress != 100}
              >
                Reset
              </button>
              <button
                disabled={
                  products.name.length < 3 ||
                  detectForm(id, !products.imageUrl, "") ||
                  products.price == 0 ||
                  products.category.length < 1 ||
                  products.brand.length < 1 ||
                  products.desc.length < 20 ||
                  detectForm(id, uploadProgress < 100, "") ||
                  products.firebaseImageUrl === ""
                }
                type="submit"
                className={classes["submit-button"]}
              >
                {detectForm(id, "Save Product", "Edit Product")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
