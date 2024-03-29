import { useState } from "react";
function CustomDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions =
    options &&
    options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleSelectOption = (selectedOption) => {
    onChange(selectedOption);
    setIsOpen(false);
  };
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        onClick={handleButtonClick}
        className="py-2 px-4 bg-white border border-gray-300 rounded-md w-full text-left"
      >
        {value ? `${value.name}` : placeholder}
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 w-[95%] h-[400px] overflow-y-auto">
          <input
            type="text"
            placeholder="Search Drug ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border-b border-gray-300 w-full mb-2 sticky top-0 bg-white z-10"
          />
          <div>
            <div className="py-2 px-2 hover:bg-gray-100 cursor-pointer grid grid-cols-5 bg-ha-primary2">
              <span className="w-full flex items-center justify-start">
                Name
              </span>
              <span className="w-full flex items-center justify-start">
                Manufacturer
              </span>
              <span className="w-full flex items-center justify-start">
                Quantity
              </span>
              <span className="w-full flex items-center justify-start">
                form
              </span>
              <span className="w-full flex items-center justify-start">
                unit
              </span>
            </div>
            {filteredOptions.map((el, index) => (
              <div
                key={index}
                className="py-2 px-2 hover:bg-gray-100 cursor-pointer grid grid-cols-5"
                onClick={() => handleSelectOption(el)}
              >
                <span className="w-full flex items-center justify-start">
                  {el?.name}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.manufacturer}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.quantity}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.form}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default CustomDropdown;
