import DataTable from "react-data-table-component";
import { useGetConsultationofPatient } from "../../../../hooks/reactQuery/useVisit";
import Loader from "../../../../components/ui/loader";
import { formatDate } from "../../../../hooks/formattedDate";
// import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import NewNote from "./newNote";
import { IoArrowBackOutline } from "react-icons/io5";


// interface ShowCreateNoteMap {
//   [key: string]: boolean | undefined;
//   editNoteData?: any;
//   recommendation?: any;
//   id?: string | any;
// }



function DoctorsTable({ id, cid }) {
  const {
    data: consultationData,
    isLoading: loadingConsults,
    refetch
  } = useGetConsultationofPatient(id);
  // const [showCreateNoteMap, setShowCreateNoteMap] = useState<ShowCreateNoteMap>({});
  const [showHistory, setShowHistory] = useState(false)
  const [formData, setFormData] = useState(null)


  useEffect(() => {
    if (consultationData) {
      setFormData(consultationData?.data?.consultations[0])
    }
  }, [consultationData])

  // console.log(patientData)
  // const handleDelete = (data) => {
  //   setShowCreateNoteMap((prevMap) => ({ ...prevMap, [data.id]: true, id: data.id, }));
  // };

  // const handleCloseNote = (data) => {
  //   setShowCreateNoteMap((prevMap) => ({ ...prevMap, [data.id]: false, id: data.id, }));
  // };

  // const [rowId, setId] = useState('')

  // const handleEditClick = (data, type, id) => {
  //   handleCloseNote(id)
  //   setId(id)
  //   if (rowId === id) {
  //     if (type === 'create') {
  //       setShowCreateNoteMap((prevMap) => ({ ...prevMap, [data.id]: true, editNoteData: null, id: data.id, recommendation: '' } as ShowCreateNoteMap));
  //     }

  //     if (type === 'edit') {
  //       setShowCreateNoteMap((prevMap) => ({ ...prevMap, [data.id]: true, editNoteData: data.notes, id: data.id, recommendation: data.recommendation } as ShowCreateNoteMap));
  //     }
  //   }

  // };





  console.log(consultationData, 'consultationDatas')

  if (loadingConsults) {
    return <Loader />
  }
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
      selector: (row) => <div>{row?.doctorId?.firstName} {row?.doctorId?.lastName}</div>,
      sortable: true,
    },
    {
      name: "Patient ID",
      selector: (row) => <div>{row?.patientId?.firstName} {row?.patientId?.lastName}</div>,
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
      selector: (row) => row?.status,
      sortable: true,
      // width: "200px",
    }
  ];
  const handleRowClick = (bodyData) => {
    setFormData(bodyData)
    setShowHistory(false)
  };


  const ExpandedComponent = ({ data }) => (
    <div className="flex items-center justify-center">

      {data?.notes?.length === 0 && (
        <div className="flex items-center flex-col justify-center w-full h-[300px]">
          <img src="/empty-list.svg" alt="empty" className="w-[20%] h-[70%]" />
          <h3 className="font-bold">No Notes found </h3>
          <button
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
            onClick={() => handleRowClick(data)}
          >
            Create New Note
          </button>
        </div>
      )}

      {data?.notes?.length > 0 && <div
        className="w-[1100px]  h-[auto] border-2 border-blue-400 my-3"
      >
        <div className="w-full h-full">
          <div>
            <div className="w-full h-full flex items-center justify-end gap-3 py-2 my-2 text-white bg-blue-50  px-10">
              <button className="text-white flex items-center w-[10%] hover:bg-gray-500 p-2 rounded justify-center bg-blue-500 gap-2" onClick={() => handleRowClick(data)}>
                <AiOutlineEdit /> <span>Edit</span>
              </button>
              {/* <button className="text-white flex items-center justify-center gap-2 p-2 hover:bg-gray-500 rounded bg-red-500" onClick={() => handleDelete(data)}>
                <AiOutlineDelete /><span>Delete</span>
              </button> */}
            </div>
            <h2 className="text-2xl font-bold p-10">{data?.recommendation}</h2>
            {data?.notes?.map((el) => (<div className="grid gap-1 mb-10 px-10" key={el?.question}>
              <span className="font-bold text-lg capitalize">{el.question}</span>
              <p className="font-normal text-gray-500">
                {el.answer}
              </p>
            </div>))}

          </div>
        </div>
      </div>}


      {/* {showCreateNoteMap[data.id] && (
        <NewNote
          refetch={refetch}
          cid={data?.id}
          initialData={showCreateNoteMap?.editNoteData ? showCreateNoteMap?.editNoteData : null}
          recommendation={showCreateNoteMap.recommendation}
          onClose={() => handleCloseNote(data)}
          setShowHistory
        />
      )} */}



    </div>
  );



  return (
    <div className="w-full">
      {showHistory && consultationData?.data?.consultations.length > 0 &&
        <div><div className="flex items-center justify-start w-full gap-3 cursor-pointer" onClick={() => setShowHistory(false)}> <IoArrowBackOutline className='text-ha-primary1' />
          <label className="font-bold text-lg text-ha-primary1">Doctor's Notes:</label></div><DataTable
            columns={columns}
            data={consultationData?.data?.consultations}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          /></div>}
      {!showHistory && consultationData?.data?.consultations.length > 0 &&
        <NewNote
          refetch={refetch}
          // initialData={consultationData?.data?.consultations[0]?.notes ? consultationData?.data?.consultations[0]?.notes : null}
          // recommendation={consultationData?.data?.consultations[0]?.recommendation}
          initialData={formData?.notes}
          recommendation={formData?.recommendation}
          onClose={() => setShowHistory(false)}
          pid={id}
          cid={cid}
          setShowHistory={setShowHistory}
        />}

    </div>
  );
}

export default DoctorsTable;
