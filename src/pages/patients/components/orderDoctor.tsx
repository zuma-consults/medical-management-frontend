import Loader from "../../../components/ui/loader";
import CustomPatientCard from "../../../components/ui/customPatientCard/customPatientCard";
import { useGetVisitDept } from "../../../hooks/reactQuery/useVisit";
import { useGetDoctors } from "../../../hooks/reactQuery/useUser";

function NewConsultation({ setDoctorId, setScheme, setDept, patientData }) {
  const { data: visitData, isLoading: loadingVisit } = useGetVisitDept();

  const { data: doctorData, isLoading: loadingdoctor } = useGetDoctors();

  console.log(doctorData, "doctorData");

  //patient info to render
  const patient = patientData;

  // lab drop down data
  const schemes = patient?.schemeId || [];
  //  const clinicPanels = clinicPanelData?.data || [];

  return (
    <div>
      {loadingVisit && <Loader />}
      {loadingdoctor && <Loader />}
      <>
        <div>
          <CustomPatientCard
            key={patient.id}
            patientName={`${patient?.salutation} ${patient?.firstName} ${patient?.middleName} ${patient?.lastName}`}
            patientID={patient?.patientId}
            patientEmail={patient.address.email}
            imgSrc={patient?.address?.image}
            gender={patient?.gender}
            phoneNumber={patient?.phone}
            religion={patient?.address.religion}
            nationality={patient?.address.country}
            maritalStatus={patient?.address.maritalStatus}
            age={patient?.address.dob}
            layout={2}
          />
        </div>

        <div className="grid px-4 gap-4">
          <div className="grid">
            <label className="text-sm font-semibold text-ha-primary1">
              Scheme
            </label>
            <select onChange={(e) => setScheme(e.target.value)}>
              <option>select Schemes</option>
              {schemes?.length > 0 &&
                schemes?.map((scheme) => (
                  <option value={scheme?.id}>{scheme?.name}</option>
                ))}
            </select>
          </div>
          <div className="grid">
            <label className="text-sm font-semibold text-ha-primary1">
              Doctor
            </label>
            <select onChange={(e) => setDoctorId(e.target.value)}>
              <option>select Doctor</option>
              {doctorData?.data?.length > 0 &&
                doctorData?.data?.map((scheme) => (
                  <option value={scheme?.id}>{scheme?.name}</option>
                ))}
            </select>
          </div>
          <div className="grid">
            <label className="text-sm font-semibold text-ha-primary1">
              Department
            </label>
            <select onChange={(e) => setDept(e.target.value)}>
              <option>select Department</option>
              {visitData?.data?.length > 0 &&
                visitData?.data?.map((visit) => (
                  <option value={visit?.id}>{visit?.name}</option>
                ))}
            </select>
          </div>
        </div>
      </>
    </div>
  );
}

export default NewConsultation;
