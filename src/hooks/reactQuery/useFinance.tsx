import { useQuery, useMutation, QueryClient } from "react-query";
import FinanceService from "../../services/financeService";

const queryClient = new QueryClient();

export const useUserFinance = (id: string) => {
  return useQuery(["Finance", id], () => FinanceService.getUserFinance(id));
};

export const useUserReciepts = (id: string) => {
  return useQuery(["Finance", id], () => FinanceService.getUserReciepts(id));
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
