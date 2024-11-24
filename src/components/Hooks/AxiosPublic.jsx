import axios from "axios";
import { baseURL } from "../Services/URL";

const axiosPublic = axios.create({
  baseURL: baseURL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
