import DataTable from "react-data-table-component";
import { useUserReciepts } from "../../../../hooks/reactQuery/useFinance";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../hooks/formattedDate";
import Loader from "../../../../components/ui/loader";
import { IoMdPrint } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import PrintResult from "../../../../components/ui/printRecipt";

function PaymentTable({patientData}) {
  const { id } = useParams();
  const { data: usersFinance, isLoading: LoadinguserFinance } =
    useUserReciepts(id);
  const [selectedRowData, setSelectedRowData] = useState([]);

  if (LoadinguserFinance) {
    return <Loader />;
  }

  useEffect(() => {
    if (selectedRowData && Object.keys(selectedRowData).length > 0) {
      handlePrint();
    }
  }, [selectedRowData]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log("usersFinance?.data?.finances", usersFinance?.data?.finances);

  const medications = (drugs) => {
    const drugNames = drugs.map((el) => {
      return el?.medicationId?.name;
    });
    return drugNames.join(", ");
  };

  const source = (row) => {
    if (row.itemType === "labs") {
      return "Laboratory";
    }
    if (row.itemType === "radiology") {
      return "Radiology";
    }
    if (row.itemType === "consultations") {
      return "Consultation";
    }
    if (row.itemType === "administered-drugs") {
      return "Pharmacy";
    }
  };

  const department = (row) => {
    if (row.itemType === "labs") {
      return row?.labId?.panelId?.panel;
    }
    if (row.itemType === "radiology") {
      return row?.radiologyId?.testId?.test;
    }
    if (row.itemType === "consultations") {
      return row?.consultationId?.visitType[0]?.name;
    }
    if (row.itemType === "administered-drugs") {
      return medications(row?.administerId?.medication);
    }
  };

  const cost = (row) => {
    if (row.itemType === "labs") {
      return row?.labId?.panelId?.cost;
    }

    if (row.itemType === "radiology") {
      return row?.amount;
    }
  };
  const sum = (total) => {
    return total?.reduce((a, b) => a + b, 0);
  };

  const columns = [
    {
      name: "Transaction Date",
      selector: (row) => formatDate(row?.timeOfPayment),
      sortable: true,
    },
    {
      name: "Receipt ID",
      selector: (row) => row?.receipt,
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => <div className="capitalize">{row?.type}</div>,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => (
        <div className="capitalize font-bold">NGN {sum(row?.total)}</div>
      ),
      sortable: true,
    },
    {
      cell: (row) => (
        <div className=" w-full flex justify-end items-center">
          <div className=" flex items-center gap-3">
            <IoMdPrint
              className="font-bold text-xl text-ha-primary1"
              onClick={() => {
                setSelectedRowData(row);
              }}
            />
            <FiSend className="font-bold text-xl text-green-600" />
          </div>
        </div>
      ),
      sortable: false,
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="relative">
      <div className="m-5 p-5 bg-black">
        <div className="w-full h-full grid grid-cols-4 bg-black text-white">
          <span className="w-full flex items-center justify-start">
            Transaction Date
          </span>
          <span className="w-full flex items-center justify-start">
            Bill Source
          </span>
          <span className="w-full flex items-center justify-start">
            Description
          </span>
          <span className="w-full flex items-center justify-start">Price</span>
        </div>
      </div>
      <div className="m-5 p-5 shadow text-black rounded-md">
        {data?.items.length > 0 ? (
          data?.items?.map((el) => (
            <div className="w-full h-full grid grid-cols-4 p-2 border">
              <span className="w-full flex items-center justify-start">
                {formatDate(el?.createdAt)}
              </span>
              <span className="w-full flex items-center justify-start">
                {source(el)}
              </span>
              <span className="w-full flex items-center justify-start">
                {department(el)}
              </span>
              <span className="w-full flex items-center justify-start">
                NGN {cost(el)}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center flex-col justify-center w-full h-[100px]">
            <img
              src="/empty-list.svg"
              alt="empty"
              className="w-[20%] h-[70%]"
            />
            <h3>Result yet to be filled </h3>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <div className="hidden">
        <PrintResult ref={componentRef} selectedRowData={selectedRowData} patientData={patientData} />
      </div>
      <DataTable
        columns={columns}
        data={usersFinance?.data?.finances || []}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}

export default PaymentTable;
