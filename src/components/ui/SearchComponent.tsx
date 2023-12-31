import React, { ChangeEvent, KeyboardEvent } from "react";
import { BiSearchAlt } from "react-icons/bi";

interface SearchComponentProps {
  value: string;
  placeholder?: string;
  Label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  placeholder,
  onChange,
  onKeyDown,
  Label,
}) => {
  return (
    <div>
      <label className="text-sm font-semibold text-ha-primary1 px-4">
        {Label}
      </label>
      <form
        action=""
        className="flex items-center justify-start border width-full px-5 mx-3 mt-2 rounded-[.5rem]"
      >
        <div>
          <BiSearchAlt />
        </div>
        <input
          type="text"
          name="search"
          value={value}
          placeholder={placeholder}
          className="border-none border outline-none w-[100%] inputLess"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </form>
    </div>
  );
};

export default SearchComponent;
