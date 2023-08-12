import React from "react";
import classes from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {
  return (
    <section>
      <div className={`${classes.container} ${classes.product}`}>
        <aside className={classes.filter}>
          <ProductFilter />
        </aside>
        <div className={classes.content}>
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Product;
