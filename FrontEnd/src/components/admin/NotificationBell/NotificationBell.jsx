import { Badge, Popover, List, Avatar, Button, Spin } from "antd";
import useGetAdminNotifications from "../../../hooks/useGetAdminNotifications";
import useMarkNotificationsAsRead from "../../../hooks/useMarkNotificationsAsRead";
import socket from "../../../socket/socket";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationBell() {
  const queryClient = useQueryClient();
  
  // Lấy data qua Hook GET (React Query lo toàn bộ loading, error, cache)
  const { data: notifications = [], isLoading } = useGetAdminNotifications();

  // Gọi Hook PATCH để đánh dấu đã đọc
  const { mutate: markAllAsRead, isPending } = useMarkNotificationsAsRead();

  // duy trì Socket để hứng thông báo real-time
  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.emit("join-room", "admin-room");

    socket.on("new_notification", () => {
      // Khi có thông báo qua socket -> chỉ cần bảo React Query làm mới cache là xong!
      queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
    });

    return () => {
      socket.off("new_notification");
    };
  }, [queryClient]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const menuDropdown = (
    <div className="w-80">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <span className="font-bold">Thông báo hệ thống</span>
        {unreadCount > 0 && (
          <Button 
            type="link" 
            size="small" 
            onClick={() => markAllAsRead()} // Gọi Hook Patch
            loading={isPending}
          >
            Đọc tất cả
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center py-6"><Spin size="small" /></div>
      ) : (
        <List
          size="small"
          dataSource={notifications}
          locale={{ emptyText: "Không có thông báo nào" }}
          renderItem={(item) => (
            <List.Item className={`hover:bg-gray-50 p-2 rounded ${!item.isRead ? "bg-blue-50/50" : ""}`}>
              <List.Item.Meta
                avatar={<Avatar src={item.sender?.avatar}>{item.sender?.name?.[0]}</Avatar>}
                title={<span className="text-xs font-semibold">{item.title}</span>}
                description={<span className="text-xs text-gray-500">{item.content}</span>}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <Popover content={menuDropdown} trigger="click" placement="bottomRight">
      <button className="relative rounded-full p-2 text-on-surface-variant hover:bg-surface-container">
        <Badge count={unreadCount} size="small">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </Badge>
      </button>
    </Popover>
  );
}