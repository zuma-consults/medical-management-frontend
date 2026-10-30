import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import ClinicCenterService, {
  NewClinicCentertData,
} from "../../services/clinicCenterService";

export const useGetClinicCenter = () => {
  return useQuery("clinicCenter", ClinicCenterService.getClinicCenter);
};

export const useGetClinicCenterById = (id: string) => {
  return useQuery(["clinicCenter", id], () =>
    ClinicCenterService.getClinicCenterById(id),
  );
};

export const useAddClinicCenter = () => {
  return useMutation(
    (data: NewClinicCentertData) => ClinicCenterService.addClinicCenter(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clinicCenter");
      },
    },
  );
};

export const useUpdateClinicCenter = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewClinicCentertData }) =>
      ClinicCenterService.updateClinicCenter(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clinicCenter");
      },
    },
  );
};

export const useDeleteClinicCenter = () => {
  return useMutation(
    (id: string) => ClinicCenterService.deleteClinicCenter(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clinicCenter");
      },
    },
  );
};
