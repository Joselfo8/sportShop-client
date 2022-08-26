import ReactSelect from "react-select";

function Select({
  options,
  placeholder = "",
  defaultValue = null,
  onChange,
  width = "8rem",
  margin = "0",
}: {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  defaultValue?: { label: string; value: string } | null;
  onChange?: (newValue: { label: string; value: string } | null) => void;
  width?: string;
  margin?: string;
}) {
  return (
    <ReactSelect
      styles={{
        container: (props) => ({
          ...props,
          width,
          margin,
        }),
        control: () => ({
          backgroundColor: "rgba(18, 18, 18)",
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
            color: "rgba(255, 255, 255, 1)",
            width: "100%",
            ":active": { backgroundColor: "rgba(51, 51, 51, 0.5)" },
          };
        },
        menu: (props) => ({
          ...props,
          backgroundColor: "rgba(18, 18, 18)",
          borderRadius: "0.2rem",
        }),
      }}
      {...{ options, defaultValue, placeholder, onChange }}
    />
  );
}

export default Select;
