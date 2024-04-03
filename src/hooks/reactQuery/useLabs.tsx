import { useQuery, useMutation, QueryClient } from "react-query";
import LabService, { NewLabData } from "../../services/labService";

const queryClient = new QueryClient();

// export const useGetLab = () => {
//   return useQuery("Lab", LabService.getLab);
// };

export const useGetLabCenters = () => {
  return useQuery("LabCenters", LabService.getLabCenters);
};

export const useGetLabById = (id: string) => {
  return useQuery(["Lab", id], () => LabService.getLabById(id),{
    cacheTime: 0,
  });
};

export const useGetLabCenterById = (id: string) => {
  return useQuery(["LabCenter", id], () => LabService.getLabCenter(id));
};

export const useGetPatientLab = (id: string) => {
  return useQuery(["LabPatient", id], () => LabService.getPatientLab(id));
};

export const useSearchLabPatient = (
  param: string | number,
  isEnabled: boolean = false,
) => {
  return useQuery(
    ["searchLabPatient", param],
    () => LabService.searchLabPatient(param),
    {
      enabled: isEnabled,
    },
  );
};

export const useAddLab = () => {
  return useMutation((data: NewLabData) => LabService.addLab(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("Lab");
    },
  });
};

export const useAddLabCenter = () => {
  return useMutation(
    (data: { center: string }) => LabService.createLabCenter(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("LabCenters");
      },
    },
  );
};

// export const useUpdateLab = () => {
export const useUpdateReceiveLab = () => {
  return useMutation(
    ({ id, data }: { id: string; data: { text: string } }) =>
      LabService.updateReceiveLab(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Lab");
      },
    },
  );
};

export const useUpdateAwaitAprovalLab = () => {
  return useMutation(
    ({ id, data }: { id: string; data }) =>
      LabService.updateAwaitApprovalLab(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Lab");
      },
    },
  );
};

export const useUpdateLab = () => {
  return useMutation(
    ({ id, data }: { id: string; data }) => LabService.updateLab(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Lab");
      },
    },
  );
};

export const useUpdateLabCenter = () => {
  return useMutation(
    ({ id, data }: { id: string; data: { center: string } }) =>
      LabService.editLabCenter({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("LabCenters");
      },
    },
  );
};

export const useDeleteLab = () => {
  return useMutation((id: string) => LabService.deleteLab(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("Lab");
    },
  });
};

export const useDeleteLabCenter = () => {
  return useMutation((id: string) => LabService.deleteLabCenter(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("LabCenters");
    },
  });
};

//specimen
export const useSpecimens = () => {
  return useQuery("specimens", LabService.getSpecimens);
};

export const useAddSpecimen = () => {
  return useMutation(
    (data: {
      specimen: string;
      color: string;
      description: string;
      type: string;
    }) => LabService.createSpecimen(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("specimens");
      },
    },
  );
};

export const useUpdateSpecimen = () => {
  return useMutation(
    ({ id, data }: { id: string; data: { specimen: string; color: string } }) =>
      LabService.editSpecimen({ id, data }), // Fix the missing comma here
    {
      onSuccess: () => {
        queryClient.invalidateQueries("specimens");
      },
    },
  );
};

export const useDeleteLabSpecimen = () => {
  return useMutation((id: string) => LabService.deleteSpecimen(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("specimens");
    },
  });
};

//Lab Tests
type LabTests = {
  panel: string;
  cost: number;
  specimenId: string;
  centerId: string;
};

export const useGetLabTests = () => {
  return useQuery("labTests", LabService.getLabTests);
};

export const useAddLabTest = () => {
  return useMutation((data: LabTests) => LabService.createLabTest(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("labTests");
    },
  });
};

export const useUpdateLabTest = () => {
  return useMutation(
    ({ id, data }: { id: string; data: LabTests }) =>
      LabService.editLabTests({ id, data }), // Fix the missing comma here
    {
      onSuccess: () => {
        queryClient.invalidateQueries("labTests");
      },
    },
  );
};

export const useDeleteLabTest = () => {
  return useMutation((id: string) => LabService.deleteLabTest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("labTests");
    },
  });
};
