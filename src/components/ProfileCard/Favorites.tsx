import { useState, useEffect } from "react";
import defaultImage from "../../assets/default-item-image.jpg";
// Styles
import styles from "./Favorites.module.css";

function Item({
  id = "",
  checked = false,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles["item-cont"]}>
      <div className={styles["item"]}>
        <div className={styles["item-info"]}>
          <div className={styles["image-cont"]}>
            <img src={defaultImage} alt="product title" />
          </div>
          <div className={styles["item-info-wrapper"]}>
            <span className={styles["item-title"]}>
              Orange shirt 2022 edition gold
            </span>
            <span className={styles["item-price"]}>Price: $8.99</span>
          </div>
        </div>
        <div className={`${styles["item-buttons"]} primary`}>
          <span className={styles["item-button"]}>Add to cart</span>
          <span className={styles["item-button"]}>Buy now</span>
          <span className={styles["item-span"]}>Delete product</span>
        </div>
      </div>
      <div className={styles["checkbox-cont"]}>
        <input
          onChange={onChange}
          id={id}
          value={id}
          type="checkbox"
          checked={checked}
        />
      </div>
    </div>
  );
}

function Favorites() {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState<Array<string>>([]);
  const [list, setList] = useState<Array<string>>([]);

  // set items if array length === 0
  useEffect(() => {
    if (list.length === 0)
      setList(["orange-shirt-1", "orange-shirt-2", "orange-shirt-3"]);
  }, [list]);

  // if checkbox is check add to selectedItems, else delete from state
  const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, checked } = e.currentTarget;

    if (checked) {
      setIsChecked((prev) => [...prev, id]);
    } else setIsChecked((prev) => [...prev.filter((s) => s !== id)]);
  };

  // select all items
  const handleSelectAll = () => {
    setIsCheckedAll((prev) => !prev);
    setIsChecked(list.map((li) => li));

    if (isCheckedAll) setIsChecked([]);
  };

  return (
    <>
      <div className={styles["title-cont"]}>
        <span className={styles["title"]}>Favorites</span>

        <div className={styles["buttons"]}>
          <label htmlFor="select-page">
            Show
            <select id="select-page">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            per page
          </label>
          <label htmlFor="select-item" className={styles["checkbox"]}>
            Select all
            <input
              onChange={handleSelectAll}
              id="select-item"
              type="checkbox"
            />
          </label>
        </div>
      </div>
      <div className={styles["info-wrapper"]}>
        <Item
          id="orange-shirt-1"
          onChange={handleCheck}
          checked={isChecked.includes("orange-shirt-1")}
        />
        <Item
          id="orange-shirt-2"
          onChange={handleCheck}
          checked={isChecked.includes("orange-shirt-2")}
        />
        <Item
          id="orange-shirt-3"
          onChange={handleCheck}
          checked={isChecked.includes("orange-shirt-3")}
        />
      </div>
    </>
  );
}

export default Favorites;
