import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import radiologyService, {
  NewRadiologyData,
} from "../../services/radiologyService";

export const useGetRadiologyById = (id: string) => {
  return useQuery(["Radiology", id], () =>
    radiologyService.getRadiologyById(id),
  );
};

export const useGetPatientRadiology = (id: string) => {
  return useQuery(["RadiologyPatient", id], () =>
    radiologyService.getPatientRadiology(id),
  );
};

export const useSearchRadiologyPatient = (
  param: string | number,
  isEnabled: boolean = false,
) => {
  return useQuery(
    ["searchRadiologyPatient", param],
    () => radiologyService.searchRadiologyPatient(param),
    {
      enabled: isEnabled,
    },
  );
};

export const useAddRadiology = () => {
  return useMutation(
    (data: NewRadiologyData) => radiologyService.addRadiology(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Radioloogy");
      },
    },
  );
};

export const useUpdateRadiology = () => {
  return useMutation(
    ({ id, data }: { id: string; data }) =>
      radiologyService.updateRadiology(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Radioloogy");
      },
    },
  );
};

export const useUpdateCapture = () => {
  return useMutation(
    ({ id, data }: { id: string; data }) =>
      radiologyService.updateCapture(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Radioloogy");
      },
    },
  );
};

export const useUpdateRadiologyResult = () => {
  return useMutation(
    ({ id, data }: { id: string; data }) =>
      radiologyService.updateRadiologyResult(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Radioloogy");
      },
    },
  );
};

export const useDeleteRadiology = () => {
  return useMutation((id: string) => radiologyService.deleteRadiology(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Radioloogy");
    },
  });
};

//centers
export const useGetRadiologyCenters = () => {
  return useQuery("RadiologyCenters", radiologyService.getRadiologyCenters);
};

export const useAddRadiologyCenter = () => {
  return useMutation(
    (data: { center: string }) => radiologyService.createRadiologyCenter(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RadiologyCenters");
      },
    },
  );
};

export const useGetRadiologyCenterById = (id: string) => {
  return useQuery(["RadiologyCenter", id], () =>
    radiologyService.getRadiologyCenter(id),
  );
};

export const useUpdateRadiologyCenter = () => {
  return useMutation(
    ({ id, data }: { id: string; data: { center: string } }) =>
      radiologyService.editRadiologyCenter({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RadiologyCenters");
      },
    },
  );
};

export const useDeleteRadiologyCenter = () => {
  return useMutation(
    (id: string) => radiologyService.deleteRadiologyCenter(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RadiologyCenters");
      },
    },
  );
};

//observations
export const useGetRadiologyObservation = () => {
  return useQuery("Observations", radiologyService.getRadiologyObservations);
};

export const useDeleteRadiologyObservation = () => {
  return useMutation(
    (id: string) => radiologyService.deleteRadiologyObservation(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Observations");
      },
    },
  );
};

export const useAddRadiologyObservation = () => {
  return useMutation(
    (data: { test: string; cost: number; centerId: string }) =>
      radiologyService.createRadiologyObservation(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Observations");
      },
    },
  );
};

export const useUpdateRadiologyObservation = () => {
  return useMutation(
    ({
      id,
      data,
    }: {
      id: string;
      data: { test: string; cost: number; centerId: string };
    }) => radiologyService.editRadiologyObservation({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Observations");
      },
    },
  );
};
