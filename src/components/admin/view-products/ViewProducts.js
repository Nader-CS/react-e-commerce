import React, { useEffect, useState } from "react";
import classes from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import ImageComponent from "../../imageComponent/ImageComponent";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { setProducts as storeProducts } from "../../../redux/slices/productsSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getProducts = () => {
    setIsLoading(true);
    try {
      let collRef = collection(db, "products");
      const q = query(collRef, orderBy("createdAt", "desc"));
      let results = [];
      onSnapshot(
        q,
        (snapshot) => {
          let allProducts = snapshot.docs.map((doc) => {
            let data = doc.data();
            if (data.editedAt) {
              return {
                id: doc.id,
                ...data,
                createdAt:
                  data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate().toISOString()
                    : data.createdAt,
                editedAt:
                  data.editedAt instanceof Timestamp
                    ? data.editedAt.toDate().toISOString()
                    : data.editedAt,
              };
            } else {
              return {
                id: doc.id,
                ...data,
                createdAt:
                  data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate().toISOString()
                    : data.createdAt,
              };
            }
          });
          console.log(allProducts);
          setProducts(allProducts);
          setIsLoading(false);
          dispatch(storeProducts({ products: allProducts }));
        },
        (error) => {}
      );
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const deleteProductHandler = async (id, firebaseImageUrl) => {
    try {
      const documentRefrence = doc(db, "products", id);
      await deleteDoc(documentRefrence);
      const desertRef = ref(storage, firebaseImageUrl);
      await deleteObject(desertRef);
      toast.success("Deleted Successfully");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const confirmDelete = (id, firebaseImageUrl, name) => {
    Notiflix.Confirm.show(
      "Delete Product!",
      `You are About to delete (${name})`,
      "Delete",
      "Cancel",
      function okCb() {
        deleteProductHandler(id, firebaseImageUrl);
      },
      function cancelCb() {
        console.log("Product Deleted Cancelled");
      },
      {
        width: "400px",
        borderRadius: "8px",
        titleColor: "red",
        titleFontSize: "1.5rem",
        okButtonBackground: "red",
        // etc...
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes["table-continer"]}>
        <div className={classes["header"]}>
          <h2>Products</h2>
        </div>
        {products.length > 0 ? (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>n</th>
                <th>Image</th>
                <th>name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, firebaseImageUrl, category } = product;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <ImageComponent src={firebaseImageUrl} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={classes.icons}>
                      <Link to={`/admin/add-products/${id}`}>
                        <FaEdit size="20" color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        onClick={() => {
                          confirmDelete(id, firebaseImageUrl, name);
                        }}
                        size="18"
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Products Found.</p>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
