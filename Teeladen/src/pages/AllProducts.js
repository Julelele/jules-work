import { useEffect } from 'react';

import ProductList from '../components/Products/ProductList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoProductsFound from '../components/Products/NoProductsFound';
import useHttp from '../hooks/use-http';
import { getAllProducts } from '../lib/api';

const AllProducts = () => {
  const { sendRequest, status, data: loadedProducts, error } = useHttp(
    getAllProducts,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!loadedProducts || loadedProducts.length === 0)) {
    return <NoProductsFound />;
  }

  return <ProductList products={loadedProducts} />;
};

export default AllProducts;