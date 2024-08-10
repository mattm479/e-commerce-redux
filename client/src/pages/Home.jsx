import ProductList from "../components/ProductList/index.jsx";
import CategoryMenu from "../components/CategoryMenu/index.jsx";
import Cart from "../components/Cart/index.jsx";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
