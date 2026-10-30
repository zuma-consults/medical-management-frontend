/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  useUserFinance,
  useUserReciepts,
} from "../../../../hooks/reactQuery/useFinance";
import Loader from "../../../../components/ui/loader";
import { formatDate } from "../../../../hooks/formattedDate";

function FinanceTable({ id }: { id: string }) {
  const { data: outstanding, isLoading: loadingBills } = useUserFinance(id);
  const { data: receipts, isLoading: loadingReceipts } = useUserReciepts(id);

  if (loadingBills || loadingReceipts) {
    return <Loader />;
  }

  const billSource = (row: any) => {
    if (row.itemType === "labs") return "Laboratory";
    if (row.itemType === "radiology") return "Radiology";
    if (row.itemType === "consultations") return "Consultation";
    if (row.itemType === "administered-drugs") return "Pharmacy";
    return row.itemType || "—";
  };

  const outstandingColumns = [
    {
      name: "Date",
      selector: (row: any) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Source",
      selector: (row: any) => billSource(row),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) =>
        `₦${Number(row.amount || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: () => "Outstanding",
    },
  ];

  const receiptColumns = [
    {
      name: "Date",
      selector: (row: any) => formatDate(row.timeOfPayment || row.createdAt),
      sortable: true,
    },
    {
      name: "Receipt",
      selector: (row: any) => row.receipt || "—",
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row: any) => row.type || "—",
    },
    {
      name: "Amount",
      selector: (row: any) => {
        const total = Array.isArray(row.total)
          ? row.total.reduce((a: number, b: number) => a + b, 0)
          : Number(row.amount || 0);
        return `₦${Number(total).toLocaleString()}`;
      },
      sortable: true,
    },
  ];

  const bills = outstanding?.data?.finances || [];
  const paid = receipts?.data?.finances || [];

  return (
    <div className="space-y-8 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-ha-primary1 font-semibold">Outstanding Bills</h3>
        <Link
          to={`/finance/${id}`}
          className="text-sm text-ha-primary1 underline"
        >
          Open billing desk
        </Link>
      </div>
      {Array.isArray(bills) && bills.length > 0 ? (
        <DataTable columns={outstandingColumns} data={bills} pagination />
      ) : (
        <div className="flex flex-col items-center py-8 text-gray-500">
          <img src="/empty-list.svg" alt="" className="w-24 mb-2 opacity-70" />
          <p>No outstanding bills for this patient.</p>
        </div>
      )}

      <h3 className="text-ha-primary1 font-semibold">Payment History</h3>
      {Array.isArray(paid) && paid.length > 0 ? (
        <DataTable columns={receiptColumns} data={paid} pagination />
      ) : (
        <div className="flex flex-col items-center py-8 text-gray-500">
          <img src="/empty-list.svg" alt="" className="w-24 mb-2 opacity-70" />
          <p>No payments recorded yet.</p>
        </div>
      )}
    </div>
  );
}

export default FinanceTable;
