// useUser.ts
import { useQuery, useMutation, QueryClient } from "react-query";
import { useCookies } from "react-cookie";
import UserService, { User, LoginData } from "../../services/userService";
import { toast } from "react-toastify";

// Create a new instance of QueryClient if it doesn't exist
const queryClient = new QueryClient();

// React Query hook for fetching all users
export const useGetUsers = () => {
  return useQuery("users", UserService.getUsers);
};
export const useGetDoctors = () => {
  return useQuery("doctors", UserService.getDoctors);
};

export const useGetUserByToken = () => {
  return useQuery(["token"], () => UserService.getUsersByToken());
};

// React Query hook for user registration
export const useRegister = () => {
  return useMutation((user: User) => UserService.register(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useDeleteUser = () => {
  return useMutation((id: string) => UserService.deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useLogin = () => {
  const [, setCookie] = useCookies(["accessToken"]);
  return useMutation((data: LoginData) => UserService.login(data), {
    onSuccess: (response) => {
      if (response && response.data && response.data.accessToken) {
        setCookie("accessToken", response.data?.accessToken);
        queryClient.invalidateQueries("login");
      } else {
        toast.error("Login error");
        return;
      }
    },
  });
};

export const useActivate = () => {
  return useMutation((data: LoginData) => UserService.activate(data));
};

export const useReset = () => {
  return useMutation((data: { password: string }) => UserService.reset(data));
};

export const useForgot = () => {
  return useMutation((data: { username: string }) => UserService.forgot(data));
};
