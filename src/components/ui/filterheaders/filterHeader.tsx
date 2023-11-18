interface FilterHeaderProps {
  children: React.ReactNode;
  title: string;
  buttonTitle: string;
  resetFilter: () => void;
  search: () => void;
  handleCreate: ()=> void
}

function FilterHeader({ children, title, buttonTitle, resetFilter, search, handleCreate }: FilterHeaderProps) {
  return (
    <div className="bg-white px-10 py-4 rounded-[.5rem] shadow mb-5">
      <div className="flex flex-col md:flex-row items-center justify-between pb-1 border-b">
        <span className="text-xl font-bold">{title}</span>
        <span
            className="border bg-ha-primary1 rounded-[1rem] w-[auto] py-2 px-4 flex items-center justify-center font-bold text-white cursor-pointer hover:bg-blue-600"
            onClick={handleCreate}
          >
           {buttonTitle}
          </span>
      </div>

      <div className="py-3">{children}</div>

      <div className="w-full pt-2 border-t">
        <div className="md:w-[20%] w-full flex flex-col md:flex-row items-center justify-between">
          <span
            className="border border-red-300 rounded-[.5rem] md:w-[49%] w-full h-9 flex items-center justify-center font-bold text-red-500 cursor-pointer hover:bg-red-100"
            onClick={resetFilter}
          >
            Reset
          </span>
          <span
            className="border border-blue-300 rounded-[.5rem] md:w-[49%] w-full h-9 flex items-center justify-center font-bold text-ha-primary1 cursor-pointer hover:bg-blue-100"
            onClick={search}
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
}

export default FilterHeader;
