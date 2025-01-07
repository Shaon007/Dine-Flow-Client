import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://dine-flow-server-neon.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Error Caught in Interceptor:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((logoutError) => {
              console.error("Error during logout:", logoutError);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
