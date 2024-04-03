import { useQuery, useMutation, QueryClient } from "react-query";
import pharmacyService, {
  NewPharmacyData,
  TreatmentData,
} from "../../services/pharmacyService";
const queryClient = new QueryClient();

export const useGetPharmacy = () => {
  return useQuery("Pharmacy", pharmacyService.getPharmacy);
};

export const useGetPharmacyById = (id: string) => {
  return useQuery(["Pharmacy", id], () => pharmacyService.getPharmacyById(id));
};

export const useAddPharmacy = () => {
  return useMutation(
    (data: NewPharmacyData) => pharmacyService.addPharmacy(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Pharmacy");
      },
    },
  );
};

export const useUpdatePharmacy = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewPharmacyData }) =>
      pharmacyService.updatePharmacy(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Pharmacy");
      },
    },
  );
};

export const useDeletePharmacy = () => {
  return useMutation((id: string) => pharmacyService.deletePharmacy(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Pharmacy");
    },
  });
};

//pharmacy Order
export const useGetTreatments = () => {
  return useQuery("Treatment", pharmacyService.getTreatments);
};

export const useGetTreatmentById = (id: string) => {
  return useQuery(["Treatment", id], () =>
    pharmacyService.getTreatmentById(id),
  );
};

export const useGetUserTreatmentB = (id: string) => {
  return useQuery(["userTreatment", id], () =>
    pharmacyService.getUserTreatment(id),
  );
};

export const useAddTreatment = () => {
  return useMutation(
    (data: TreatmentData) => pharmacyService.addTreatment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Treatment");
      },
    },
  );
};

export const useUpdateTreatment = () => {
  return useMutation(
    ({ id, data }: { id: string; data: TreatmentData }) =>
      pharmacyService.updateTreatment(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Treatment");
      },
    },
  );
};

export const useConfirmTreatment = () => {
  return useMutation(
    ({ id, data }: { id: string; data: { dispensed: boolean } }) =>
      pharmacyService.confirmTreatment(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Treatment");
      },
    },
  );
};

export const useDeleteTreatment = () => {
  return useMutation((id: string) => pharmacyService.deleteTreatment(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Treatment");
    },
  });
};
