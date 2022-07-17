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
  const state = useSelector((state: any) => state.rootReducer);

  // get products from store
  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  const render = {
    allProducts:
      state.products.length === 0 ? (
        <div>
          <h2>Loading products</h2>
        </div>
      ) : (
        state.products.map((p: any) => {
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
      state.productsFiltered.length === 0 ? (
        <div>
          <h2>No products found!</h2>
        </div>
      ) : (
        state.productsFiltered.map((p: any) => {
          return (
            <div key={p.title}>
                    <Card
              // key={p.title} //Al pasar una key por props a un elemento arroja un warning, por eso deb ponerse un div y pasarle como key el title
              id={p.id}
              image={p.image}
              title={p.title}
              category={p.category}
              price={p.price}
            />
            </div>
      
          );
        })
      ),
  };

  return (
    <div>
      <NavBar />

      <Filter />

        {
          state.productsFiltered.length === 0 ? <div style={{paddingLeft:"120px"}}>Product Not Found</div> : <></>
        }
      <div className={style.cardContainer}>
        {state.productsFiltered.length === 0
          ? render.allProducts
          : render.searchProducts}
      </div>

      <div className={style.pagination}>
        <Pagination
          maxPage={state.maxPage}
          next={state.next}
          previous={state.previous}
          selected={page}
          onSelected={setPage}
        />
      </div>

      <br />

      <Footer />
    </div>
  );
}
