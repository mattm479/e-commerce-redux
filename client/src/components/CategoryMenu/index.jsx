import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  updateCategories,
  updateCurrentCategory,
} from '../../utils/actions.js';
import { QUERY_CATEGORIES } from '../../utils/queries.js';
import { idbPromise } from '../../utils/helpers.js';
import {useDispatch, useSelector} from "react-redux";

function CategoryMenu() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories({ categories: categoryData.categories }));
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(updateCategories({ categories: categories }));
      });
    }
  }, [categoryData, loading]);

  const handleClick = (id) => {
    dispatch(updateCurrentCategory({ currentCategory: id }));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
