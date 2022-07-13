import ReactSelect from "react-select";

function Select({
  options,
  placeholder,
  defaultValue = { label: "", value: "" },
  onChange,
  width = "8rem",
}: {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  defaultValue?: { label: string; value: string };
  onChange?: (newValue: { label: string; value: string } | null) => void;
  width?: string;
}) {
  return (
    <ReactSelect
      styles={{
        container: (props) => ({
          ...props,
          width,
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
      options={options}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}

export default Select;
