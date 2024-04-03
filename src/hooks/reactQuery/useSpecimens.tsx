import { useQuery, useMutation, QueryClient } from "react-query";
import SpecimenService, {
  NewSpecimenData,
} from "../../services/specimenService";

const queryClient = new QueryClient();

export const useGetSpecimen = () => {
  return useQuery("Specimen", SpecimenService.getSpecimen);
};

export const useGetSpecimenById = (id: string) => {
  return useQuery(["Specimen", id], () => SpecimenService.getSpecimenById(id));
};

export const useAddSpecimen = () => {
  return useMutation(
    (data: NewSpecimenData) => SpecimenService.addSpecimen(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Specimen");
      },
    },
  );
};

export const useUpdateSpecimen = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewSpecimenData }) =>
      SpecimenService.updateSpecimen(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Specimen");
      },
    },
  );
};

export const useDeleteSpecimen = () => {
  return useMutation((id: string) => SpecimenService.deleteSpecimen(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Specimen");
    },
  });
};
