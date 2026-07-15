import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const useGetAdminNotifications = () => {
  return useQuery({
    queryKey: ["adminNotifications"],  
    queryFn: async () => {
      const res = await api.get("/admin/notifications");
      return res.data; 
    },
    keepPreviousData: true
  });
};

export default useGetAdminNotifications;