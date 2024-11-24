import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecure from "./AxiosSecure";

const useAdmin = () => {
  const { userData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [userData?.username, "isAdmin"],
    queryFn: async () => {
      if (!userData?.username) {
        return false;
      }
      const response = await axiosSecure.get(
        `/user/is-admin?username=${userData.username}`
      );
      return response.data; // This will be true or false
    },
    enabled: !!userData?.username,
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
