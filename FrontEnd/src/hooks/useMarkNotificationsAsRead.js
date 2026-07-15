import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.patch("/admin/notifications/read-all");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
    },
    onError: (error) => {
      console.error("Lỗi khi đánh dấu đã đọc thông báo:", error);
    }
  });
};

export default useMarkNotificationsAsRead;