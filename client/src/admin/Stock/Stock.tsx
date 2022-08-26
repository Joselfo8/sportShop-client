import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Store
import { getDetails } from "redux/action";
// Components
import Kid from "./Sizes/Kid";
import Man from "./Sizes/Man";
import Woman from "./Sizes/Woman";
// Styles
import styles from "./Stock.module.scss";

const Stock = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.rootReducer.details);

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id]);

  if (!product.subCategory) {
    return <div>Loading..</div>;
  } else if (product.category === "MAN") {
    return (
      <div>
        <div className={styles.gridLayout}>
          <div className={styles.containerStock}>
            <img src={product.image} />

            <Man id={params.id} subCategory={product.subCategory} />
          </div>

          <div className={styles.containerTable}>
            <div className={styles.containerSizes}>
              <p>Size</p>
              {product ? (
                Object.keys(product.stock).map((e: any) => (
                  <div>
                    <span>{e}</span>
                  </div>
                ))
              ) : (
                <div>Not Found</div>
              )}
            </div>

            <div className={styles.containerQuantity}>
              <p>Quantity</p>
              {product ? (
                Object.values(product.stock).map((e: any) => (
                  <div>
                    <span>{e}</span>
                  </div>
                ))
              ) : (
                <div>Not Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (product.category === "WOMAN") {
    return (
      <div>
        <div className={styles.gridLayout}>
          <div className={styles.containerStock}>
            <img src={product.image} />
            <Woman id={params.id} subCategory={product.subCategory} />
          </div>

          <div className={styles.containerTable}>
            <div className={styles.containerSizes}>
              <p>Size</p>
              {Object.keys(product.stock).map((e: any) => (
                <div>
                  <span>{e}</span>
                </div>
              ))}
            </div>

            <div className={styles.containerQuantity}>
              <p>Quantity</p>
              {product ? (
                Object.values(product.stock).map((e: any) => (
                  <div>
                    <span>{e}</span>
                  </div>
                ))
              ) : (
                <div>Not Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (product.category === "KID") {
    return (
      <div>
        <div className={styles.gridLayout}>
          <div className={styles.containerStock}>
            <img src={product.image} />
            <Kid id={params.id} subCategory={product.subCategory} />
          </div>

          <div className={styles.containerTable}>
            <div className={styles.containerSizes}>
              <p>Size</p>
              {Object.keys(product.stock).map((e: any) => (
                <div>
                  <span>{e}</span>
                </div>
              ))}
            </div>

            <div className={styles.containerQuantity}>
              <p>Quantity</p>
              {product ? (
                Object.values(product.stock).map((e: any) => (
                  <div>
                    <span>{e}</span>
                  </div>
                ))
              ) : (
                <div>Not Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div> Hola</div>;
  }
};

export default Stock;
