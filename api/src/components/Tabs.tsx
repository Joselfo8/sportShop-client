import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Helpers
import formatKey from "../helpers/formatKey";
// Styles
import styles from "./Tabs.module.css";

interface TabLinkProps {
  label: string;
  to: string;
}

function TabLink({ label, to }: TabLinkProps) {
  return (
    <Link {...{ to }} className={styles["tab"]}>
      {label}
    </Link>
  );
}

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
      className={`${styles["tab"]} ${
        selected === id ? styles["tab-active"] : ""
      }`}
    >
      {text}
    </span>
  );
}

interface TabsProps {
  tabs: Array<string>;
  links: Array<{ label: string; to: string }>;
  getSelected: (selected: string) => void;
}

function Tabs({ tabs, links, getSelected }: TabsProps) {
  const [selected, setSelected] = useState("");

  // if one tab is clicked, update selected
  const handleSelected = useCallback(
    (key: string) => {
      setSelected(key);
      // pass selected tab to parent
      getSelected(key);
    },
    [setSelected, getSelected]
  );

  // set selected tab by default
  useEffect(() => {
    if (selected.length === 0) handleSelected(formatKey(tabs[0]));
  }, [tabs, selected, handleSelected]);

  return (
    <div className={`${styles["container"]}`}>
      {tabs &&
        tabs.map((t) => {
          const key = formatKey(t);

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
      {links &&
        links.map((l) => {
          const key = formatKey(l.label);

          return <TabLink key={key} label={l.label} to={l.to} />;
        })}
    </div>
  );
}

export default Tabs;
