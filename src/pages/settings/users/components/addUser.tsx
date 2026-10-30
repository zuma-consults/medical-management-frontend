import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Doctor", value: "doctor" },
  { label: "Laboratory", value: "laboratory" },
  { label: "Radiology", value: "radiology" },
  { label: "Patients", value: "Patients" },
  { label: "Pharmacy", value: "Pharmacy" },
  { label: "Nursing", value: "Nursing" },
  { label: "Admin", value: "admin" },
];

function AddUser({ setFormData }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,

      role: selected.map((item) => item?.value),
    }));
  }, [selected, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="p-5">
      <form className="grid gap-2">
        <div className="">
          <div className="block">
            <label htmlFor="gender">Module Access</label>
          </div>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </div>
        <div className="">
          <div className="block">
            <label>First Name</label>
          </div>
          <input
            id="firstName"
            className="w-full"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <div className="block">
            <label>Last Name</label>
          </div>
          <input
            id="lastName"
            className="w-full"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <div className="block">
            <label>Email</label>
          </div>
          <input
            id="email"
            className="w-full"
            required
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}

export default AddUser;
