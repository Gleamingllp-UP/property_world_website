import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { debounce } from "lodash";

const allLocations = [
  "Dubai",
  "Jumeirah",
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Palm Jumeirah",
  "Deira",
  "Al Barsha",
  "JLT",
  "Abu Dhabi",
  "Al Ain",
  "Yas Island",
  "Saadiyat Island",
  "Sharjah",
  "Al Majaz Waterfront",
  "Al Noor Mosque",
  "Ajman",
  "Fujairah",
  "Ras Al Khaimah",
  "Umm Al Quwain",
];

const LocationSearch = forwardRef(
  ({ setLocation, location, setOpenDropdown }, ref) => {
    const [inputValue, setInputValue] = useState(location || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedSearch = useCallback(
      debounce((value) => {
        const filtered = allLocations.filter((loc) =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      }, 300),
      []
    );

    useImperativeHandle(ref, () => ({
      closeDropdown: () => {
        setShowSuggestions(false);
        setInputValue("");
      },
      openDropdown: () => {
        if (inputValue && suggestions.length > 0) {
          setShowSuggestions(true);
        }
      },
      clearInput: () => {
        setInputValue("");
        setSuggestions([]);
        setShowSuggestions(false);
      },
    }));

    const handleChange = (e) => {
      const val = e.target.value;
      setInputValue(val);

      if (!val.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        debouncedSearch(val);
      }
    };

    const handleSelect = (value) => {
      setInputValue(value);
      setLocation(value);
      setShowSuggestions(false);
    };

    useEffect(() => {
      if (!inputValue && location) {
        setLocation("");
      }
    }, [inputValue, location, setLocation]);

    return (
      <div className="mmm_input d-block position-relative">
        <div className="big_search">
          <input
            type="text"
            name="search"
            placeholder="Enter Location"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => {
              if (inputValue && suggestions.length > 0) {
                setShowSuggestions(true);
              }
              setOpenDropdown?.("");
            }}
            className="search_bxi rounded"
          />
          <i className="ri-map-pin-line map_iic" />

          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="position-absolute bg-white w-100 mt-1 shadow-sm rounded list-group"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {suggestions.map((loc, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(loc)}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer", fontSize: "14px" }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

export default React.memo(LocationSearch);
