import { useState, useEffect } from "react";
// Icons
import { ReactComponent as ArrowNext } from "../icons/arrow-next.svg";
import { ReactComponent as ArrowPrevious } from "../icons/arrow-previous.svg";
// Helpers
import paginate from "../helpers/paginate";
// Styles
import styles from "./Pagination.module.css";

interface ButtonProps {
  value: number;
  text: string;
  selected: number;
  onSelected: (prev: number) => void;
  children?: React.ReactNode;
}

function Button({ value, text, selected, onSelected, children }: ButtonProps) {
  return (
    <li
      onClick={() => onSelected(Number(value))}
      className={`${children ? styles["arrow-button"] : styles["button"]} ${
        String(selected) === text ? "primary" : ""
      }`}
    >
      {children ? children : value}
    </li>
  );
}

interface PaginationProps {
  maxPage: number;
  next: {
    limit: number;
    page: number;
  };
  previous: {
    limit: number;
    page: number;
  };
  selected: number;
  onSelected: (prev: number) => void;
}

function Pagination({
  maxPage = 1,
  next,
  previous,
  onSelected,
  selected,
}: PaginationProps) {
  const [buttons, setButtons] = useState<Array<React.ReactNode>>([]);
  const [pagesToShow, setPagesToShow] = useState(4);
  const [resolution, setResolution] = useState(0);

  // map maxPage prop to an array of objects
  useEffect(() => {
    const { pages } = paginate(maxPage, selected, next?.limit ? next?.limit : 10, pagesToShow);

    setButtons([
      <Button
        key="previous"
        selected={selected}
        onSelected={onSelected}
        value={previous?.page}
        text="previous"
      >
        <ArrowPrevious className={styles["arrow"]} />
      </Button>,
      ...pages.map((p: number) => (
        <Button
          key={p}
          selected={selected}
          onSelected={onSelected}
          value={p}
          text={String(p)}
        />
      )),
      <Button
        key="next"
        selected={selected}
        onSelected={onSelected}
        value={next?.page}
        text="next"
      >
        <ArrowNext className={styles["arrow"]} />
      </Button>,
    ]);

  }, [pagesToShow, maxPage, next, previous, selected, onSelected]);

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

  return <ul className={`${styles["pagination"]} secondary`}>{buttons}</ul>;
}

export default Pagination;
