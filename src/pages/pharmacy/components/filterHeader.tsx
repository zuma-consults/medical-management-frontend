import { BiSearchAlt } from "react-icons/bi";
import FilterHeader from "../../../components/ui/filterheaders/filterHeader";
import { useEffect, useState } from "react";
import Loader from "../../../components/ui/loader";
import {
  useGetTreatments,
  useSearchTreatments,
} from "../../../hooks/reactQuery/usePharmacy";

function PharmacyFilterHeader({ setreatments }) {
  const [search, setSearch] = useState("");
  const { isLoading, data, refetch } = useGetTreatments();
  const {
    data: searchData,
    isLoading: searching,
    refetch: searchRefetch,
  } = useSearchTreatments(search);

  useEffect(() => {
    if (searchData?.data) {
      setreatments(searchData);
    } else if (data) {
      setreatments(data);
    }
  }, [data, searchData, setreatments]);

  if (isLoading || searching) {
    return <Loader />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (search.trim()) {
        await searchRefetch();
      } else {
        await refetch();
      }
    }
  };

  const resetHandler = async () => {
    setSearch("");
    await refetch();
  };

  const searchHandler = async () => {
    if (search.trim()) {
      await searchRefetch();
    } else {
      await refetch();
    }
  };

  return (
    <div className="Patients">
      <FilterHeader
        title="All Pharmacy Orders"
        resetFilter={resetHandler}
        search={searchHandler}
      >
        <form className="grid">
          <div className="flex w-full border rounded-lg items-center px-5">
            <div>
              <BiSearchAlt />
            </div>
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search by patient name, ID, phone, or email"
              className="border-none border outline-none w-[100%] inputLess"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>
      </FilterHeader>
    </div>
  );
}

export default PharmacyFilterHeader;
