import { BiSearchAlt } from "react-icons/bi";
import FilterHeader from "../../../components/ui/filterheaders/filterHeader";
import { useState } from "react";
import Loader from "../../../components/ui/loader";
// import { useGetUserByToken } from "../../../hooks/reactQuery/useUser";
import {
  useAddTreatment,
  useGetTreatments,
} from "../../../hooks/reactQuery/usePharmacy";
import { toast } from "react-toastify";

function Patients({ setreatments }) {
  const [search, setSearch] = useState("");
  // const { isLoading, data, refetch } = useGetTreatments(search);
  const { isLoading, data, refetch } = useGetTreatments();
  const {
    data: consultationData,
    isLoading: loadingConsults,
    mutate: createMutate,
  } = useAddTreatment();

  setreatments(data);


  if (consultationData && consultationData?.status) {
    toast.success("Successfully Created Consultation");
    createMutate(null);
  }

  if (isLoading || loadingConsults) {
    return <Loader />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await refetch();
    }
  };

  const resetHandler = () => {
    setSearch("");
  };

  const searchHandler = async () => {
    await refetch();
  };

  return (
    <div className="Patients">
      <FilterHeader
        title="All Pharmacy Order"
        // buttonTitle="New Consultation"
        resetFilter={resetHandler}
        search={searchHandler}
        // handleCreate={() => {
        //   setShowCreate(true)
        // }}
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
              placeholder="Search for patients"
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

export default Patients;
