import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Store
import { getProductsByCategoryAndSubcategory } from "redux/action";
// Styles
import styles from "./DropDown.module.css";

function MenuItem({
  label,
  to,
  onClick,
}: {
  label: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link className={styles["menu-item"]} to={to} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

function DropDown({ category }: { category: string }) {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: any) => state.rootReducer.categories.categories
  );

  const productCategory = (e: any, d: any) => {
    dispatch(
      getProductsByCategoryAndSubcategory({
        category: e,
        argument: d,
      })
    );
  };

  const handleClick = (category: string, subCategory: string) => {
    productCategory(category, subCategory);
  };

  return (
    <ul className={styles["sub-menu"]}>
      {/* Map subcategories only */}
      {categories.map((el: any) => {
        return (
          category === el.category && (
            <MenuItem
              key={`${el.sub_category}-unique-key`}
              onClick={() => handleClick(category, el.sub_category)}
              label={el.sub_category}
              to={`/${el.category}/${el.sub_category}`}
            />
          )
        );
      })}
    </ul>
  );
}

export default DropDown;
