import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import ProductForm from "../components/Products/ProductForm";
import useHttp from "../hooks/use-http";
import { addProduct } from "../lib/api";

const NewProduct = () => {
  const { sendRequest, status } = useHttp(addProduct);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/products");
    }
  }, [status, history]);

  const addProductHandler = (productData) => {
    sendRequest(productData);
  };

  return (
    <div>
      <h1>Neues Produkt?</h1>
      <ProductForm
        isLoading={status === "pending"}
        onAddProduct={addProductHandler}
      />
    </div>
  );
};

export default NewProduct;
