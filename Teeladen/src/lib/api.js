import { cartActions } from "../store/cart-slice";

const FIREBASE_DOMAIN = "https://react-teeladen-default-rtdb.firebaseio.com";

//in AllProducts
export async function getAllProducts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/products.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch products.");
  }

  const transformedProducts = [];

  for (const key in data) {
    const productObj = {
      id: key,
      ...data[key],
    };

    transformedProducts.push(productObj);
  }

  return transformedProducts;
}

//in ProductDetail
export async function getSingleProduct(productId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/products/${productId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch product.");
  }

  const loadedProduct = {
    id: productId,
    ...data,
  };

  return loadedProduct;
}

//in NewProduct and ProductForm
export async function addProduct(productData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/products.json`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create product.");
  }

  return null;
}

//waiting
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/cart.json`);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//waiting
export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/cart.json`, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount
        }),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

    } catch (error) {
      console.log(error);
    }
  };
};

//in Comment and NewCommentForm
export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.productId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(productId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${productId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
