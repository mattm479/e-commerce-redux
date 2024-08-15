import { configureStore } from "@reduxjs/toolkit";
import {productCartReducer} from './reducers.js'

export const store = configureStore({
  reducer: productCartReducer,
});

//const { Provider } = StoreContext;

/*const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};*/

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };
