import { useQuery, useMutation, QueryClient } from "react-query";
import ClinicPanelService, {
  NewClinicPanelData,
} from "../../services/clinicPanelService";

const queryClient = new QueryClient();

export const useGetClinicPanel = () => {
  return useQuery("ClinicPanel", ClinicPanelService.getClinicPanel);
};

export const useGetClinicPanelById = (id: string) => {
  return useQuery(["ClinicPanel", id], () =>
    ClinicPanelService.getClinicPanelById(id),
  );
};

export const useAddClinicPanel = () => {
  return useMutation(
    (data: NewClinicPanelData) => ClinicPanelService.addClinicPanel(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ClinicPanel");
      },
    },
  );
};

export const useUpdateClinicPanel = () => {
  return useMutation(
    ({ id, data }: { id: string; data: NewClinicPanelData }) =>
      ClinicPanelService.updateClinicPanel(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ClinicPanel");
      },
    },
  );
};

export const useDeleteClinicPanel = () => {
  return useMutation((id: string) => ClinicPanelService.deleteClinicPanel(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("ClinicPanel");
    },
  });
};
