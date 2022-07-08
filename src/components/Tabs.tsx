import { useState } from "react";
// Helpers
import formatKey from "../helpers/formatKey";
// Styles
import styles from "./Tabs.module.css";

interface TabProps {
  text: string;
  id: string;
  selected: string;
  onSelected: () => void;
}

function Tab({ text, id, selected, onSelected }: TabProps) {
  return (
    <span
      onClick={onSelected}
      className={`${styles["tab"]} ${selected === id ? styles["tab-active"] : ""}`}
    >
      {text}
    </span>
  );
}

interface TabsProps {
  tabs: Array<string>;
  getSelected: (selected: string) => void;
}

function Tabs({ tabs, getSelected }: TabsProps) {
  const [selected, setSelected] = useState("");

  // if one tab is clicked, update selected
  const handleSelected = (key: string) => {
    setSelected(key);
    // pass selected tab to parent
    getSelected(key);
  };

  return (
    <div className={`${styles["container"]} primary`}>
      {tabs &&
        tabs.map((t, i) => {
          const key = formatKey(t);

          // select the first tab by default
          if (i === 0 && selected.length === 0) setSelected(key);

          return (
            <Tab
              key={key}
              id={key}
              text={t}
              selected={selected}
              onSelected={() => handleSelected(key)}
            />
          );
        })}
    </div>
  );
}

export default Tabs;
