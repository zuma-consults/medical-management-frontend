import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import FinanceService from "../../services/financeService";

export const useUserFinance = (id: string) => {
  return useQuery(["Finance", "outstanding", id], () =>
    FinanceService.getUserFinance(id),
  );
};

export const useUserReciepts = (id: string) => {
  return useQuery(["Finance", "receipts", id], () =>
    FinanceService.getUserReciepts(id),
  );
};

export const useMakePayment = () => {
  return useMutation(
    (params: { id: string; data: { receipt: string; paymentType: string } }) =>
      FinanceService.makePayment(params.id, params.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Finance");
      },
    },
  );
};
