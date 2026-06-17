import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "../../lib/api";

// Chuyển sang nhận tham số dạng Object để đồng bộ toàn bộ bộ lọc từ UI xuống Backend
const useGetCourse = ({ page, limit, search, category, price }) => {
  return useQuery({
    // Đưa tất cả các trạng thái lọc vào queryKey để tự động refetch khi có bất kỳ thay đổi nào
    queryKey: ["courses", page, limit, search, category, price],
    queryFn: async () => {
      const res = await api.get("/api/courses", { 
        params: {
          page,
          limit,
          search,
          // Nếu UI chọn 'All' thì không cần gửi param lên backend
          category: category === "All" ? undefined : category,
          price: price === "All" ? undefined : price,
        },
      });
      return res.data;
    },
   
    placeholderData: keepPreviousData, 
  });
};

export default useGetCourse;