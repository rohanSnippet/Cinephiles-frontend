import React from "react";
import Select from "react-select"; // Assuming you're using react-select library

const MultiSelect = ({
  options,
  labelField,
  valueField,
  selectedValues,
  name,
  onChange,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "white",
      width: "48vh",
      height: "7vh",
      borderColor: "gray",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#374151" : "#1f2937",
      color: "white",
      "&:hover": {
        backgroundColor: "#374151",
      },
    }),
  };
  return (
    <Select
      isMulti
      options={options}
      getOptionLabel={(option) => option[labelField]}
      getOptionValue={(option) => option[valueField]}
      value={selectedValues}
      onChange={onChange}
      name={name}
      styles={customStyles}
      classNamePrefix="react-select"
    />
  );
};

export default MultiSelect;
