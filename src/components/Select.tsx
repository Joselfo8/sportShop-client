import { useState, useEffect, useRef } from "react";
import ReactSelect from "react-select";

function Select({
  options,
  placeholder,
}: {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) {
  return (
    <ReactSelect
      styles={{
        control: () => ({
          backgroundColor: "rgba(18, 18, 18)",
          width: "fit-content",
          display: "flex",
          borderRadius: "0.2rem",
        }),
        singleValue: (props) => ({
          ...props,
          color: "#fff",
        }),
        option: (props, state) => {
          const bg = state.isSelected ? "rgba(51, 51, 51)" : "rgba(18, 18, 18)";

          return {
            ...props,
            backgroundColor: bg,
            ":active": { backgroundColor: "rgba(51, 51, 51, 0.5)" },
          };
        },
        menu: (props) => ({
          ...props,
          backgroundColor: "rgba(18, 18, 18)",
          borderRadius: "0.2rem",
        }),
      }}
      options={options}
      placeholder={placeholder}
    />
  );
}

export default Select;
