import { useEffect } from 'react';
import ProductItem from '../ProductItem/index.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries.js';
import { idbPromise } from '../../utils/helpers.js';
import spinner from '../../assets/spinner.gif';
import {useDispatch, useSelector} from "react-redux";
import {updateProducts} from "../../utils/actions.js";

function ProductList() {
  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.currentCategory);
  const products = useSelector((state) => state.products);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      data.products.forEach(async (product) => {
        await idbPromise('products', 'put', product);
      });
      dispatch(updateProducts({ products: data.products }));
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts({ products: products }));
      });
    }
  }, [data, loading]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
