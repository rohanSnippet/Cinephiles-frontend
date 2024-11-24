import { useState, useEffect } from "react";
import useAxiosSecure from "./AxiosSecure";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await axiosSecure.get(`/user?username=${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();

    // Cleanup to cancel requests if the component unmounts
    return () => {
      // You can implement Axios cancel token here if necessary
    };
  }, [username, axiosSecure]);

  return user;
};

export default useAuth;
