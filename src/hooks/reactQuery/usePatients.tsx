import { useQuery, useMutation, QueryClient } from "react-query";
import PatientService, { NewPatientData } from "../../services/patientService";

const queryClient = new QueryClient();

export const useGetPatients = (page: number) => {
  return useQuery(["patients", page], () => PatientService.getPatients(page), {
    enabled: false,
  });
};

export const useGetPatientById = (id: string) => {
  return useQuery(["patient", id], () => PatientService.getPatientById(id));
};

export const useSearchPatient = (
  param: string | number,
  isEnabled: boolean = false,
) => {
  return useQuery(
    ["searchPatient", param],
    () => PatientService.searchPatient(param),
    {
      enabled: isEnabled,
    },
  );
};

export const useAddPatient = () => {
  return useMutation(
    (data: NewPatientData) => PatientService.addPatient(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
      },
    },
  );
};

export const useUpdatePatient = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewPatientData }) =>
      PatientService.updatePatient(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
      },
    },
  );
};

export const useDeletePatient = () => {
  return useMutation((id: string) => PatientService.deletePatient(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
    },
  });
};
