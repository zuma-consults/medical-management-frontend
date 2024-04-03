import { forwardRef, useEffect } from "react";
import { Avatar } from "flowbite-react";
import "./waterMark.css";
import { useGetRadiologyById } from "../../hooks/reactQuery/useRadiology";
interface PrintResultProps {
  selectedRowData: any;
  rePrint?: any;
  printData: any;
}

const PrintRadiologyResult = forwardRef<HTMLDivElement, PrintResultProps>(
  (props, ref) => {
    const { selectedRowData, rePrint, printData } = props;

    const MainData = selectedRowData;
    const { testId, id, patientId, schemeId, centerId } = MainData;

    // Return null if id is undefined or null
    if (!id) {
      return null;
    }

    const { data, refetch } = useGetRadiologyById(id);

    useEffect(() => {
      if (rePrint !== undefined) {
        // rePrint has changed, trigger API call
        refetch();
      }
    }, [rePrint, refetch]);

    const result = data?.data?.result || [];

    const renderObservations = () => {
      if (!result || result.length === 0) {
        return (
          <tr>
            <td>No observations found.</td>
          </tr>
        );
      }

      return result.map((item) => (
        <tr key={item.id}>
          <td className="pl-4 border">{item.observation}</td>
          <td className="pl-4 border">{item.unit}</td>
          <td className="pl-4 border">{item.value}</td>
          <td className="pl-4 border">{item.range}</td>
        </tr>
      ));
    };

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based (0 = January)
    const day = today.getDate();

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    function calculateAge(dob) {
      const dobDate = new Date(dob);
      const today = new Date();

      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }

      return age;
    }
    const dob = patientId?.address.dob;
    const age = calculateAge(dob);

    return (
      <div ref={ref} className="px-4 border py-4 shadow watermark">
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center">
            <div>
              <Avatar
                alt="User settings"
                img="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                rounded
              />
            </div>

            <h1 className="font-bold text-xl ml-3 text-ha-primary1">MedOpt</h1>
          </div>
          <h1 className="font-bold">Radiology Report</h1>
          <h1>
            <span>Date: </span>
            {formattedDate}
          </h1>
        </div>
        <div className="border-[2px]">
          <table className="border-collapse w-[100%]">
            <tr>
              <td className="font-bold border-r border-b pl-2">
                Patient Name:
              </td>
              <td className="border-r border-b pl-2 capitalize">
                {`${patientId?.salutation} ${patientId?.firstName} ${patientId?.middleName} ${patientId?.lastName}`}
              </td>

              <td className="font-bold border-r border-b pl-2">Gender:</td>
              <td className="border-b pl-2 capitalize">
                {MainData?.patientId.gender}
              </td>
            </tr>
            <tr>
              <td className="font-bold border-r border-b pl-2">Age:</td>
              <td className="border-r border-b pl-2">{age}</td>
              <td className="font-bold border-r border-b pl-2">Patient Id:</td>
              <td className="border-b pl-2">{patientId?.patientId}</td>
            </tr>
            <tr>
              <td className="font-bold border-r border-b pl-2">Scheme</td>
              <td className="border-b pl-2">{schemeId?.name || "No Scheme"}</td>
              <td className="font-bold border-r border-b pl-2">Clinic Name</td>
              <td className="border-b pl-2">
                {printData?.clinicId.name || "No Clinic Name"}
              </td>
            </tr>
            <tr>
              <td className="font-bold border-r border-b pl-2">
                Radiology Unit:
              </td>
              <td className=" border-b pl-2">{centerId.center}</td>
            </tr>
          </table>
        </div>
        <div className="border-[2px] mt-5">
          <h1 className="capitalize font-extrabold text-2xl">{testId?.test}</h1>
          <table
            className="w-full rounded-[.3rem] text-left border-collapse"
            style={{ borderSpacing: "0 1rem" }}
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

              {renderObservations()}
            </tbody>
          </table>
        </div>
        <h4 className="mt-5">
          Lab Note: H - FOR VALUE ABOVE RANGE, L - FOR VALUE BELOW RANGE
        </h4>
      </div>
    );
  }
);

export default PrintRadiologyResult;
