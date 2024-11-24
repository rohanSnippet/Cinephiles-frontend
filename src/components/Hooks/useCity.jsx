import { useState, useEffect, useCallback } from "react";
import useAxiosSecure from "./AxiosSecure";

const useCity = () => {
  const [city, setCity] = useState(null);

  const axiosSecure = useAxiosSecure();
  const username = localStorage.getItem("username");

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data?.address?.city) {
            setCity(data.address.city); // Set city from geolocation API
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (!username) {
        getLocation();
        return;
      }

      try {
        const res = await axiosSecure.get(`/user?username=${username}`);

        if (res.data?.currLocation) {
          setCity(res.data.currLocation);
        } else {
          getLocation();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        getLocation();
      }
    };

    fetchCity();

    return () => {
      // Add cancellation logic here if necessary
    };
  }, [username, axiosSecure, getLocation]);
  return city;
};

export default useCity;
