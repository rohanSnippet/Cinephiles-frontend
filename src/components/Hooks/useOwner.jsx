import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useOwner = () => {
  const { userData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isOwner, isLoading: isOwnerLoading } = useQuery({
    queryKey: [userData?.username, "isOwner"],
    queryFn: async () => {
      if (!userData?.username) {
        return false;
      }
      const response = await axiosSecure.get(
        `/user/is-owner?username=${userData.username}`
      );
      return response.data;
    },
    enabled: !!userData?.username, // The query only runs if a username exists
  });

  return [isOwner, isOwnerLoading];
};

export default useOwner;
