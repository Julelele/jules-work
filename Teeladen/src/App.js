import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import { sendCartData, fetchCartData } from "./lib/api";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //here because of the navigation
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>
        <Route path="/products" exact>
          <AllProducts />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="/new-product">
          <NewProduct />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
