import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./tag.css";

export default function FixedTags() {
  const storedTags = JSON.parse(localStorage.getItem("tags")) || [];
  const [value, setValue] = React.useState<any>([]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newValue = event.target.value.trim();
      if (!storedTags.includes(newValue)) {
        setValue([...value, newValue]);
        localStorage.setItem("tags", JSON.stringify([...storedTags, newValue]));
      }
    }
  };

  const handleDeleteTag = (tagToDelete: any) => {
    setValue(value.filter((tag: any) => tag !== tagToDelete));
  };

  return (
    <div className="my-6 mx-2 px-3">
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue([...newValue]);
        }}
        options={storedTags}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <div
              key={index}
              className="MuiButtonBase-root  MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-deletable MuiChip-deletableColorDefault MuiChip-filledDefault MuiAutocomplete-tag MuiAutocomplete-tagSizeMedium"
            >
              <div className="custom-option relative">
                <span className="">{option}</span>
                {option !== "Select tags" && ( // Display delete icon for all tags except "Select tags"
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconFilledColorDefault"
                    onClick={() => handleDeleteTag(option)}
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="black"
                    style={{ display: "visible" }}
                    data-testid="CancelIcon"
                  >
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                  </svg>
                )}
              </div>
               
            </div>
          ))
        }
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter tag"
            placeholder="Favorites"
            onKeyDown={handleKeyDown}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <div {...props} className="flex flex-wrap gap-2 ">
            <span className="custom-option1 mb-2">{option}</span>
          </div>
        )}
      />
      
    </div>
  );
}
