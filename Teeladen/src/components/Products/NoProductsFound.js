import { Link } from 'react-router-dom';

import classes from './NoProductsFound.module.css';

const NoProductsFound = () => {
  return (
    <div className={classes.noproducts}>
      <p>Keine Produkte gefunden.</p>
      <Link className='button' to='/new-product'>
        Tee hinzufügen!
      </Link>
    </div>
  );
};

export default NoProductsFound;