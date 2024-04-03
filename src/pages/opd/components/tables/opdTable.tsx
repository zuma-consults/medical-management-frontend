import DataTable from "react-data-table-component";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../../../components/ui/modals/basicModal";
import { useState } from "react";
import TakeNursingVitals from "../takeNursingVitals";
import { useAddVitals, useGetConsultations } from "../../../../hooks/reactQuery/useVisit";
import Loader from "../../../../components/ui/loader";
import { formatDate } from "../../../../hooks/formattedDate";
import { toast } from "react-toastify";

function OpdTable({ consults }) {
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const { data: consultationData, isLoading: loadingConsults } =
    useGetConsultations();
  const { status: vitalsStatus, isLoading: vitalsLoading, mutate: vitalsMutate } = useAddVitals();

  const [formData, setFormData] = useState({
    timeTaken: "",
    weight: "",
    systolicBP: "",
    diastolicBP: "",
    temperature: "",
    respiratoryRate: "",
    heartRate: "",
    urineOutput: "",
    bloodSugarF: "",
    bloodSugarR: "",
    spo2: "",
    avpu: "",
    trauma: "",
    mobility: "",
    oxygenSupplementation: "",
    fluidIntake: "",
    fluidOutput: "",
  });
  if (vitalsStatus === 'success') {
    toast.success("Vitals Taken successfully");
    vitalsMutate(null);
    setFormData({
      timeTaken: "",
      weight: "",
      systolicBP: "",
      diastolicBP: "",
      temperature: "",
      respiratoryRate: "",
      heartRate: "",
      urineOutput: "",
      bloodSugarF: "",
      bloodSugarR: "",
      spo2: "",
      avpu: "",
      trauma: "",
      mobility: "",
      oxygenSupplementation: "",
      fluidIntake: "",
      fluidOutput: "",
    })
  }
  if (loadingConsults || vitalsLoading) {
    return <Loader />;
  }
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#ffff",
        text: "bold",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "56px",
        textTransform: "capitalize",
        cursor: "pointer",
      },
    },
  };

  const handleVitals = (row) => {
    setConsultation(row);
    setShowVitalsModal(true);
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => formatDate(row?.createdAt),
      sortable: true,
      // width: "200px",
    },
    // {
    //   name: "Visit ID",
    //   selector: (row) => row?.id,
    //   sortable: true,
    //   // width: "200px",
    // },
    {
      name: "Doctor",
      selector: (row) => (
        <div>
          {row?.doctorId?.firstName} {row?.doctorId?.lastName}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Patient ID",
      selector: (row) => (
        <div>
          {row?.patientId?.firstName} {row?.patientId?.lastName}
        </div>
      ),
      sortable: true,
      // width: "200px",
    },
    {
      name: "Patient ID",
      selector: (row) => <div>{row?.patientId?.patientId}</div>,
      sortable: true,
      // width: "200px",
    },
    {
      name: "Visit Type",
      selector: (row) => row?.visitType[0]?.name,
      sortable: true,
      // width: "200px",
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className={
            row?.status === "seen"
              ? "capitalize bg-green-500 p-3 w-[80px] flex items-center justify-center rounded-full text-white font-bold"
              : "capitalize bg-yellow-500 p-3 w-[80px] flex items-center justify-center rounded-full text-white font-bold"
          }
        >
          {row?.status}
        </div>
      ),
      sortable: true,
      // width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className=" w-full flex justify-start items-center ">
          <div className=" w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-ha-secondary1">
            <Dropdown
              arrowIcon={false}
              inline
              label={<BsThreeDotsVertical style={{ color: "black" }} />}
            >
              <Dropdown.Item
                onClick={() => {
                  handleVitals(row);
                }}
              >
                Take Vitals
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      ),
      sortable: false,
    },
  ];

  const handleRowClick = (patientId, cid) => {
    navigate(`/visits/${patientId}/${cid}`);
  };

  const handleSubmitVitals = async () => {
    if (consultation?.paid) {
      const vitalsData = Object.entries(formData).map(([name, value]) => ({
        name,
        value: value.toString(),
      }));
      console.log(consultation, vitalsData, 'hi')
      await vitalsMutate({ id: consultation?.id, data: vitalsData });
    } else {
      toast.error('This consultation has not been paid for')
    }
  };

  return (
    <div className="rounded-[.5rem] px-10 py-4 bg-white shadow">
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
          consults?.data
            ? consults?.data
            : consultationData?.data?.consultations || []
        }
        onRowClicked={(row) => handleRowClick(row.patientId.id, row.id)}
      />

      {/* Nursing Vitals modal */}
      <BasicModal
        title="Take Vitals"
        setOpenModal={setShowVitalsModal}
        cancelTitle="Cancel"
        openModal={showVitalsModal}
        showCancelButton={true}
        submitTitle="Submit Vitals"
        showSubmitButton={true}
        size="4xl"
        submitHandler={() => handleSubmitVitals()}
      >
        <TakeNursingVitals
          consultation={consultation}
          setFormData={setFormData}
          formData={formData}
        />
      </BasicModal>
    </div>
  );
}

export default OpdTable;
