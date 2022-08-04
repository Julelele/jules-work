import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import { sendCartData, fetchCartData } from "./lib/api";
import AuthContext from "./context-store/auth-context";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

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

  //Kürzen!!!
  return (
      <Layout>
        <Switch>
          
          <Route path="/" exact>
            <Redirect to="/homepage" />
          </Route>

          <Route path="/homepage" exact>
            <HomePage />
          </Route>

          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}

          <Route path="/profile">
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="/products" exact>
            {authCtx.isLoggedIn && <AllProducts />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="/products/:productId">
            {authCtx.isLoggedIn && <ProductDetail />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="/new-product">
            {authCtx.isLoggedIn && <NewProduct />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </Layout>
  );
}

export default App;
