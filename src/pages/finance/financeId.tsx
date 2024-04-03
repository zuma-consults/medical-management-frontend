import PatientInfoHeader from "../../components/patientInfoHeader";
import Loader from "../../components/ui/loader";
import { useGetPatientById } from "../../hooks/reactQuery/usePatients";
import FinanceTabsCard from "./components/financeTabsCard";
import { useParams } from "react-router-dom";

function FinanceId() {
  const { id } = useParams();

  const { isLoading, data } = useGetPatientById(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="Patients">
      <PatientInfoHeader patientData={data.data} />
      <FinanceTabsCard patientData={data.data} />
    </div>
  );
}

export default FinanceId;
