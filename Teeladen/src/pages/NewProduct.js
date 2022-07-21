import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ProductForm from '../components/Products/ProductForm';
import useHttp from '../hooks/use-http';
import { addProduct } from '../lib/api';

const NewProduct = () => {
  const { sendRequest, status } = useHttp(addProduct);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/products');
    }
  }, [status, history]);

  const addProductHandler = (productData) => {
    sendRequest(productData);
  };

  return <ProductForm isLoading={status === 'pending'} onAddProduct={addProductHandler} />;
};

export default NewProduct;