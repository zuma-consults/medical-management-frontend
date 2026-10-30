import { QueryClient } from "react-query";

/** Shared QueryClient so mutations invalidate the same cache the app reads from. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
