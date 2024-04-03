import DataTable from "react-data-table-component";
import Loader from "../../../../components/ui/loader";
import { formatDate } from "../../../../hooks/formattedDate";
import {
  useConfirmTreatment,
  useGetTreatments,
  useDeleteTreatment,
} from "../../../../hooks/reactQuery/usePharmacy";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import DeleteWarningModal from "../../../../components/ui/modals/deletWarningModal";

function PharmacyTable({ treatments }) {
  console.log(treatments);
  const [showDelete, setShowDelete] = useState(false);
  const [rowData, setRowData] = useState(null);
  const {
    data: patientPharmarcy,
    refetch: patientRefetch,
    isLoading: loadingTreatments,
  } = useGetTreatments();
  const {
    mutate,
    status: confirmTreatmentStatus,
    isLoading: confirmTreatmentLoading,
  } = useConfirmTreatment();
  const {
    mutate: deleteMutate,
    status: deleteTreatmentStatus,
    isLoading: deleteTreatmentLoading,
  } = useDeleteTreatment();

  if (loadingTreatments) {
    return <Loader />;
  }

  if (loadingTreatments || confirmTreatmentLoading || deleteTreatmentLoading) {
    return <Loader />;
  }

  if (confirmTreatmentStatus === "success") {
    toast.success("Pharmarcy order Dispensed successfully");
    patientRefetch();
    mutate(null);
  }
  if (deleteTreatmentStatus === "success") {
    toast.success("Pharmarcy order deleted");
    patientRefetch();
    deleteMutate(null);
  }

  const handleConfirmation = async (rowData) => {
    console.log(rowData, "rowData");
    if (rowData?.paid) {
      const data = {
        id: rowData?.id,
        data: {
          dispensed: true,
        },
      };
      await mutate(data);
    } else {
      toast.error("Patient Has not Paid for treatment");
    }
  };
  const handleDelete = (rowData) => {
    setShowDelete(true);
    setRowData(rowData);
  };
  const handleDeleteRecord = async () => {
    await deleteMutate(rowData.id);
    setShowDelete(false);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#ffff",
        text: "bold",
        fontWeight: "bold",
        fontSize: "13px",
      },
    },
    rows: {
      style: {
        minHeight: "56px",
        textTransform: "capitalize",
        cursor: "default",
      },
    },
  };
  const columns = [
    {
      name: "Date",
      selector: (row) => formatDate(row?.createdAt),
      sortable: true,
      width: "100px",
    },
    {
      name: "Patient",
      selector: (row) =>
        `${row?.patientId?.firstName} ${row?.patientId?.lastName}`,
      sortable: true,
    },
    {
      name: "Administered By",
      selector: (row) =>
        `${row?.administeredBy?.firstName} ${row?.administeredBy?.lastName}`,
      sortable: true,
    },

    {
      name: "Patient ID",
      selector: (row) => `${row?.patientId?.patientId}`,
      sortable: true,
    },
    {
      name: "Total Cost",
      selector: (row) => ` NGN ${row?.amount}`,
      sortable: true,
    },

    {
      name: "Paid",
      cell: (row) => (
        <button
          onClick={() => handleConfirmation(row)}
          className={
            row?.paid
              ? "capitalize text-green-500 p-3 w-[80px] flex items-center justify-center rounded-full  font-bold"
              : "capitalize text-red-500 p-3 w-[80px] flex items-center justify-center rounded-full font-bold"
          }
        >
          {row?.paid ? "Paid" : "Not Paid"}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          onClick={() => handleConfirmation(row)}
          className={
            row?.dispensed
              ? "capitalize bg-green-500 p-3 w-[100px] flex items-center justify-center rounded-full text-white font-bold"
              : "capitalize bg-yellow-500 p-3 w-[100px] flex items-center justify-center rounded-full text-white font-bold"
          }
        >
          {row?.dispensed ? "Dispensed" : "Pending"}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="w-full flex items-center justify-end">
          {!row.paid && (
            <MdDeleteForever
              onClick={() => handleDelete(row)}
              className="text-red-500 text-xl"
            />
          )}
        </div>
      ),
      width: "80px",
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="relative">
      <div className="flex items-center my-2">
        <span className="mr-2 font-bold">Doctors Comment:</span>
        <span className="text-ha-primary1">
          {data.comment[0]?.text ? data.comments[0].text : "Nil"}
        </span>
      </div>
      <div className="shadow-lg bg-ha-primary2 p-1 rounded-lg mb-3">
        <div className="border-b border-blue-200 w-full px-5 py-1 font-bold text-grey ">
          Drugs Prescribed
        </div>
        <div className="m-5 p-5 bg-black shadow">
          <div className="w-full h-full grid grid-cols-6 bg-black text-white">
            <span className="w-full flex items-center justify-start">Name</span>
            <span className="w-full flex items-center justify-start">
              Manufacturer
            </span>
            <span className="w-full flex items-center justify-start">
              Quantity
            </span>
            <span className="w-full flex items-center justify-start">form</span>
            <span className="w-full flex items-center justify-start">unit</span>

            <span className="w-full flex items-center justify-start">
              Duration
            </span>
          </div>
        </div>
        <div className="m-5 p-5  text-black rounded-md bg-white">
          {data?.medication.length > 0 &&
            data?.medication?.map((el) => (
              <div className="w-full h-full grid grid-cols-6 p-2 border">
                <span className="w-full flex items-center justify-start">
                  {el?.medicationId?.name}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.medicationId?.manufacturer}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.quantity}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.medicationId?.form}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.medicationId?.unit}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.duration}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="shadow-lg bg-red-100 p-1 rounded-lg mb-2">
        <div className="border-b border-red-200 w-full px-5 py-1 font-bold text-grey ">
          Unavailable Drugs
        </div>
        <div className="m-5 p-5 bg-black shadow">
          <div className="w-full h-full grid grid-cols-3 bg-black text-white">
            <span className="w-full flex items-center justify-start">Name</span>
            <span className="w-full flex items-center justify-start">
              Quantity
            </span>
            <span className="w-full flex items-center justify-start">
              Duration
            </span>
          </div>
        </div>
        <div className="m-5 p-5  text-black rounded-md bg-white">
          {data?.outOfStockDrugs.length > 0 &&
            data?.outOfStockDrugs?.map((el) => (
              <div className="w-full h-full grid grid-cols-3 p-2 border">
                <span className="w-full flex items-center justify-start">
                  {el?.drug}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.quantity}
                </span>
                <span className="w-full flex items-center justify-start">
                  {el?.duration}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-[.5rem] px-10 py-4 bg-white shadow">
      {showDelete && (
        <DeleteWarningModal
          setOpenModal={setShowDelete}
          openModal={showDelete}
          showCancelButton
          confirmTitle="Delete"
          confirmHandler={handleDeleteRecord}
        />
      )}
      <DataTable
        customStyles={{
          headCells: {
            style: {
              backgroundColor: customStyles.headCells.style.backgroundColor,
              text: customStyles.headCells.style.text,
              fontWeight: customStyles.headCells.style.fontWeight,
              fontSize: customStyles.headCells.style.fontSize,
            },
          },
          rows: {
            style: {
              minHeight: customStyles.rows.style.minHeight,
              textTransform: "none", // Update the textTransform property to have the correct type
              cursor: customStyles.rows.style.cursor,
            },
          },
        }}
        columns={columns}
        data={
          // treatments?.data
          //   ? treatments?.data
          //   : patientPharmarcy?.data?.treatments || []
          patientPharmarcy?.data?.treatments
        }
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}

export default PharmacyTable;
