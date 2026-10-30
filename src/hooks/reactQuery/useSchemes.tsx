import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import SchemeService, { NewSchemeData } from "../../services/schemeService";

export const useGetScheme = () => {
  return useQuery("Scheme", SchemeService.getScheme);
};

export const useGetSchemeById = (id: string) => {
  return useQuery(["Scheme", id], () => SchemeService.getSchemeById(id));
};

export const useAddScheme = () => {
  return useMutation((data: NewSchemeData) => SchemeService.addScheme(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("Scheme");
    },
  });
};

export const useUpdateScheme = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewSchemeData }) =>
      SchemeService.updateScheme(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Scheme");
      },
    },
  );
};

export const useDeleteScheme = () => {
  return useMutation((id: string) => SchemeService.deleteScheme(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Scheme");
    },
  });
};
