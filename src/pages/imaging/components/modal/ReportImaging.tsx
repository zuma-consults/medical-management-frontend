import CustomLabHeader from "../../../../components/ui/customPatientCard/customPatientCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../components/ui/accordion";
import { useState } from "react";
import { useGetRadiologyById } from "../../../../hooks/reactQuery/useRadiology";
import Loader from "../../../../components/ui/loader";
import { Tooltip } from "flowbite-react";
import { BsPencilFill } from "react-icons/bs";
import EditResult from "./EditResult";

function ReportImaging({ selectedRowData, setReload }) {
  const { patientId, orderBy } = selectedRowData;
  const [isEditMode, setIsEditMode] = useState(false);
  const id = selectedRowData?.id;

  const { data, isLoading } = useGetRadiologyById(id);

  const result = data?.data?.result || [];

  //function for date and time format
  function formatDateTime(inputDate) {
    const originalDate = new Date(inputDate);
    // Create an options object with the desired date and time format
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(originalDate);
  }

  // date and time usage
  const orderedDate = formatDateTime(selectedRowData?.createdAt);

  const renderObservations = () => {
    if (!result || !result || result.length === 0) {
      return (
        <tr>
          <td>No observations found.</td>
        </tr>
      );
    }

    return result?.map((item) => (
      <tr key={item.id}>
        <td className="pl-4">{item.observation}</td>
        <td className="pl-4">{item.unit}</td>
        <td className="pl-4">{item.value}</td>
        <td className="pl-4">{item.range}</td>
      </tr>
    ));
  };

  return (
    <>
      <div className="px-4 border py-4 shadow">
        <div
          className={`px-4 py-4 font-bold flex justify-start gap-5 border w-fit mb-5 items-center rounded-[.3rem]`}
        >
          <h1 className="font-bold">Edit Result</h1>
          <Tooltip content="Edit Radiology Result">
            <BsPencilFill onClick={() => setIsEditMode(!isEditMode)}  />
          </Tooltip>
        </div>
        <div>
          <table
            className="w-full border rounded-[.3rem] text-left"
            style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <tbody>
              <tr className="text-ha-primary1">
                <th
                  className="pl-4"
                  style={{ borderBottom: "1px solid black" }}
                >
                  Observation
                </th>
                <th
                  className="pl-4"
                  style={{ borderBottom: "1px solid black" }}
                >
                  Unit
                </th>
                <th
                  className="pl-4"
                  style={{ borderBottom: "1px solid black" }}
                >
                  Value
                </th>
                <th
                  className="pl-4"
                  style={{ borderBottom: "1px solid black" }}
                >
                  References Range
                </th>
              </tr>
              {isLoading && <Loader />}

              {renderObservations()}
            </tbody>
          </table>
        </div>
      </div>

      {isEditMode && (
        <EditResult
          onRowDataChange={() => {}}
          initialRows={result}
          selectedId={id}
          setReload={setReload}
          setIsEditMode={setIsEditMode}
        />
      )}
      <Accordion
        collapsible
        type="single"
        className="bg-ha-primary2 px-4 rounded-[.3rem]"
      >
        <AccordionItem className="AccordionItem" value="item-1">
          <AccordionTrigger>
            <h1 className="text-ha-primary1">Patient Info</h1>
          </AccordionTrigger>

          <AccordionContent>
            <CustomLabHeader
              patientName={`${patientId?.salutation} ${patientId?.firstName} ${patientId?.middleName} ${patientId?.lastName}`}
              patientID={`${patientId?.patientId}`}
              patientEmail={`${patientId?.address.email} `}
              imgSrc={patientId?.address?.image}
              gender={`${patientId?.gender}`}
              phoneNumber={`${patientId?.phone}`}
              religion={`${patientId?.address?.religion}`}
              nationality={`${patientId?.address.country}`}
              maritalStatus={`${patientId?.address?.maritalStatus}`}
              age={
                patientId?.address?.dob ? patientId?.address?.dob : "Not Found"
              }
              orderedBy={`${orderBy?.firstName} ${orderBy?.lastName}`}
              orderedDate={orderedDate}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default ReportImaging;
