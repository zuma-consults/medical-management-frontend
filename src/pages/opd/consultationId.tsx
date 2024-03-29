import PatientInfoHeader from "../../components/patientInfoHeader";
import Loader from "../../components/ui/loader";
import { useGetPatientById } from "../../hooks/reactQuery/usePatients";
import PatientTabsCard from "./components/patientTabsCard";
import { useParams } from "react-router-dom";

function ConsultationId() {
  const { pid, cid } = useParams();

  const { isLoading, data } = useGetPatientById(pid);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="Patients">
      <PatientInfoHeader patientData={data.data} />
      <PatientTabsCard id={pid} cid={cid} patientData={data.data} />
    </div>
  );
}

export default ConsultationId;
