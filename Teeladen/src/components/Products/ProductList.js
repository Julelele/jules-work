import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

//Alphabetisch oder nach Preis aufsteigend
const sortProducts = (products, isSortingPrice) => {
  return products.sort((productA, productB) => {
    if (isSortingPrice) {
      return productA.price * 1 > productB.price * 1 ? 1 : -1;
    } else {
      return productA.name
        .toLowerCase()
        .localeCompare(productB.name.toLowerCase());
    }
  });
};

const ProductList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingPrice = queryParams.get("sort") === "price";

  const sortedProducts = sortProducts(props.products, isSortingPrice);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingPrice ? "alpha" : "price"}`,
    });
  };

  const sorting = (
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>
        {isSortingPrice ? "Aplhabetisch" : "Preis aufsteigend"} sortieren
      </button>
    </div>
  );

  const list = (
    <ul className={classes.list}>
      {sortedProducts.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </ul>
  );

  return (
    <Fragment>
      {sorting}
      {list}
    </Fragment>
  );
};

export default ProductList;
