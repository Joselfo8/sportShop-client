import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJSDocTagsOfKind } from "typescript";
import { getProducts } from "../../redux/action";

// Components
import Card from "../Card/Card";
import NavBar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination";
import Footer from "../Footer/Footer";

// Style
import style from "./Products.module.scss";

export default function Products() {
  // save user click pagination button
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  // get products from store
  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  const render = {
    allProducts:
      state.rootReducer.products.length === 0 ? (
        <div>
          <h2>Loading products</h2>
        </div>
      ) : (
        state.rootReducer.products.map((p: any) => {
          return (
            <Card
              key={p.title}
              id={p.id}
              image={p.image}
              title={p.title}
              category={p.category}
              price={p.price}
            />
          );
        })
      ),

    searchProducts:
      state.rootReducer.productsFiltered.length === 0 ? (
        <div>
          <h2>No products found!</h2>
        </div>
      ) : (
        state.rootReducer.productsFiltered.map((p: any) => {
          return (
            <Card
              key={p.title}
              id={p.id}
              image={p.image}
              title={p.title}
              category={p.category}
              price={p.price}
            />
          );
        })
      ),
  };

  return (
    <div>
      <NavBar />

      <Filter />

      <div className={style.cardContainer}>
        {state.rootReducer.productsFiltered.length === 0
          ? render.allProducts
          : render.searchProducts}
      </div>

      <div className={style.pagination}>
        <Pagination
          maxPage={state.rootReducer.maxPage}
          next={state.rootReducer.next}
          previous={state.rootReducer.previous}
          selected={page}
          onSelected={setPage}
        />
      </div>

      <br />

      <Footer />
    </div>
  );
}
