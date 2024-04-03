import { useQuery, useMutation, QueryClient } from "react-query";
import VisitService, { FormData, vitals } from "../../services/visitService";
const queryClient = new QueryClient();

// Function to create a unique query key
export const createQueryKey = (endpoint: string, params?: any) => {
  return [endpoint, params];
};

// Queries

export const useGetConsultations = () => {
  return useQuery("consultations", VisitService.getConsultations);
};

export const useGetConsultationById = (id: string) => {
  return useQuery(createQueryKey("consultationById", id), () =>
    VisitService.getConsultation(id),
  );
};

export const useSearchVisit = (
  param: string | number,
  isEnabled: boolean = false,
) => {
  return useQuery(
    ["searchPatient", param],
    () => VisitService.searchVisit(param),
    {
      enabled: isEnabled,
    },
  );
};

export const useGetConsultationofPatient = (id: string) => {
  return useQuery(createQueryKey("consultationOfPatient", id), () =>
    VisitService.getConsultationofPatient(id),
  );
};

export const useGetVisitDept = () => {
  return useQuery("visitDept", VisitService.getVisitDept);
};

// Mutations

export const useEditConsultation = () => {
  return useMutation(
    (data: {
      id: string;
      data: {
        doctorId: string;
        visit: string;
        patientId: string;
        schemeId: string;
      };
    }) => VisitService.editConsultation({ id: data.id, data: data.data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
      },
    },
  );
};

export const useAddVitals = () => {
  return useMutation(
    ({ id, data }: { id: string; data: vitals[] }) =>
      VisitService.AddVitals({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
      },
    },
  );
};

export const useWriteNotes = () => {
  return useMutation(
    ({ id, data }: { id: string; data: FormData }) =>
      VisitService.writeVisitNotes({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
      },
    },
  );
};
export const useDeleteConsultation = () => {
  return useMutation((id: string) => VisitService.deleteConsultation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("consultations");
    },
  });
};

export const useNewConsultation = () => {
  return useMutation(
    (data: {
      doctorId: string;
      visit: string;
      patientId: string;
      schemeId: string;
    }) => VisitService.newConsultation(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("consultations");
      },
    },
  );
};

export const useEditVisitDept = () => {
  return useMutation(
    (data: { id: string; data: { name: string; cost: number } }) =>
      VisitService.editVisitDept({ id: data.id, data: data.data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("visitDept");
      },
    },
  );
};

export const useDeleteVisitDept = () => {
  return useMutation((id: string) => VisitService.deleteVisitDept(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("visitDept");
    },
  });
};

export const useCreateVisitDept = () => {
  return useMutation(
    (data: { name: string; cost: number }) =>
      VisitService.createVisitDept(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("visitDept");
      },
    },
  );
};
