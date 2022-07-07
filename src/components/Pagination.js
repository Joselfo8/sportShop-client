import { useState, useEffect } from "react";
// Icons
import { ReactComponent as ArrowNext } from "../icons/arrow-next.svg";
import { ReactComponent as ArrowPrevious } from "../icons/arrow-previous.svg";
// Helpers
import key from "../helpers/key";
import paginate from "../helpers/paginate";
// Styles
import styles from "./Pagination.module.css";

function Button({ text, value, onSelectedPage, isSelected, children }) {
  return (
    <li
      onClick={() => onSelectedPage(value)}
      className={`${children ? styles["arrow-button"] : styles["button"]} ${
        isSelected === text ? "primary" : ""
      }`}
    >
      {children ? children : text}
    </li>
  );
}

function Pagination({ maxPage = 1, next, previous, onSelectedPage, selected }) {
  const [pag, setPag] = useState([]);
  // page buttons to show
  const [pagesToShow, setPagesToShow] = useState(4);
  const [resolution, setResolution] = useState(0);
  const mapped =
    pag.length > 0 ? (
      pag.map((p) => {
        if (p.children)
          return (
            <Button
              value={p.value}
              onSelectedPage={onSelectedPage}
              isSelected={selected}
              key={key(p.text)}
            >
              {p.children}
            </Button>
          );

        return (
          <Button
            text={p}
            value={p}
            onSelectedPage={onSelectedPage}
            isSelected={selected}
            key={key(p)}
          />
        );
      })
    ) : (
      <li></li>
    );

  useEffect(() => {
    const mapped = paginate(maxPage, selected, next?.limit, pagesToShow);
    setPag([
      {
        value: previous?.page,
        text: "previous",
        children: <ArrowPrevious className={styles["arrow"]} />,
      },
      ...mapped.pages,
      {
        value: next?.page,
        text: "next",
        children: <ArrowNext className={styles["arrow"]} />,
      },
    ]);
  }, [pagesToShow, maxPage, next, previous, selected]);

  // resize pagination when resolution get bigger
  useEffect(() => {
    if (resolution <= 640) {
      setPagesToShow(4);
    }

    // sm
    if (resolution >= 640) {
      setPagesToShow(8);
    }

    // md
    if (resolution >= 768) {
      setPagesToShow(10);
    }
  }, [resolution]);

  // get document resolution
  useEffect(() => {
    if (resolution === 0) setResolution(document.body.clientWidth);

    const getResolution = () => {
      setResolution(document.body.clientWidth);
    };
    window.addEventListener("resize", getResolution);

    return () => {
      window.removeEventListener("resize", getResolution);
    };
  }, [resolution]);

  return <ul className={`${styles["pagination"]} secondary`}>{mapped}</ul>;
}

export default Pagination;
