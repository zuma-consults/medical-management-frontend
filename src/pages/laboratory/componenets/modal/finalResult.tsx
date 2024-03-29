import CustomLabHeader from "../../../../components/ui/customPatientCard/customPatientCard";
import Loader from "../../../../components/ui/loader";
import { useGetLabById } from "../../../../hooks/reactQuery/useLabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../components/ui/accordion";
import { BsPencilFill } from "react-icons/bs";
import { Tooltip } from "flowbite-react";
import { useState } from "react";
import EditFormTable from "../../../../components/ui/dynamicFormTable/EditFormTable";

function FinalResult({ selectedRowData, setReload, rePrint, setReprint, setPrintData }) {
  const { patientId, panelId, orderBy } = selectedRowData;
  const [isEditMode, setIsEditMode] = useState(false);
  const id = selectedRowData?.id;

  const { data, isLoading } = useGetLabById(id);
  setPrintData(data?.data); // set the data to be printed
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
          className={`px-4 py-4 font-bold flex justify-between items-center rounded-[.3rem]`}
          style={{
            backgroundColor: panelId?.specimenId.color || "white",
          }}
        >
          <h1 className="capitalize font-extrabold text-2xl">
            {panelId?.panel}
          </h1>
          <Tooltip content="Edit Lab Result" placement="left">
            <BsPencilFill onClick={() => setIsEditMode(!isEditMode)} />
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
                  style={{
                    borderBottom: "1px solid black",
                    textDecoration: "capitalize",
                  }}
                >
                  Observation
                </th>
                <th
                  className="pl-4"
                  style={{
                    borderBottom: "1px solid black",
                    textDecoration: "capitalize",
                  }}
                >
                  Unit
                </th>
                <th
                  className="pl-4"
                  style={{
                    borderBottom: "1px solid black",
                    textDecoration: "capitalize",
                  }}
                >
                  Value
                </th>
                <th
                  className="pl-4"
                  style={{
                    borderBottom: "1px solid black",
                    textDecoration: "capitalize",
                  }}
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
        <EditFormTable
          onRowDataChange={() => {}}
          initialRows={result}
          selectedId={id}
          setReload={setReload}
          setIsEditMode={setIsEditMode}
          rePrint={rePrint}
          setReprint={setReprint}
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

export default FinalResult;
