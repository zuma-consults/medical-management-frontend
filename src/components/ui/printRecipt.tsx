import { forwardRef } from "react";
import { Avatar } from "flowbite-react";
import "./waterMark.css";
interface PrintResultProps {
  selectedRowData: any;
  patientData: any;
}

const PrintResult = forwardRef<HTMLDivElement, PrintResultProps>(
  (props, ref) => {
    const { selectedRowData, patientData } = props;


    //function for date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based (0 = January)
    const day = today.getDate();

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    //function for Total amount
    const totalSum = selectedRowData?.total?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    //function for formatting amount
    const formatAmount = (amount) => {
      // Check if amount is undefined or null
      if (amount === undefined || amount === null) {
        return "";
      }
      const [integerPart, decimalPart] = String(amount).split(".");

      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      return `₦${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ""}`;
    };

    const medications = (drugs) => {
      const drugNames = drugs?.map((el) => {
        return el?.medicationId?.name;
      });
      return drugNames?.join(", ");
    };

    return (
      <>
        <div ref={ref} className="px-4 border py-4 shadow watermark">
          <div className="flex items-center justify-between my-5 ">
            <div className="flex items-center">
              <div>
                <Avatar
                  alt="clinic Logo"
                  img="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                  rounded
                />
              </div>

              <h1 className="font-bold text-xl ml-3 text-ha-primary1 ">
                MedOpt
              </h1>
            </div>
            <div className="border px-5 py-2 bg-ha-primary1">
              <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
                INVOICE
              </h1>
            </div>
          </div>
          <div className=" text-left">
            <h4>
              <span className="font-bold">Invoice Number: </span>{" "}
              {selectedRowData?.receipt || selectedRowData?.administerId}
            </h4>
            <h4>
              <span className="font-bold">Date: </span>
              {formattedDate}
            </h4>
          </div>
          <div className="border-t-4 border-b-4 mt-5 gap-2 py-3 flex justify-start">
            <div>
              <h4>
                <span className="font-bold ">Bill To: </span>
                {`${patientData?.firstName} ${patientData?.lastName}`}{" "}
              </h4>
              <h4>
                <span className="font-bold ">Patient Id: </span>
                {`${patientData?.patientId} `}
              </h4>
            </div>
          </div>
          <table className="w-full my-2">
            <thead className="border-b-4 pb-2">
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Items</th>
                <th className="text-left">Service</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Payment Type</th>
              </tr>
            </thead>
            <tbody className="">
              {selectedRowData?.items?.map((row, index) => (
                <tr key={index}>
                  <td className="text-left py-5 ">{index + 1}</td>
                  <td className="text- py-5 border-b-2 capitalize">
                    {row.itemType}
                  </td>
                  <td className="text-left py-5 border-b-2">
                    {row.labId?.panelId.panel}
                    {row.radiologyId?.testId?.test}
                    {row.consultationId?.visitType[0]?.name}
                    {medications(row.administerId?.medication)}
                  </td>
                  <td className="text-right py-5 border-b-2">
                    {formatAmount(row.amount)}
                  </td>{" "}
                  <td className="text-right py-5 pr-2 border-b-2 capitalize">
                    {row.paymentType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="border px-5 my-2 bg-ha-primary1">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
                Total: {formatAmount(totalSum)}
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default PrintResult;
