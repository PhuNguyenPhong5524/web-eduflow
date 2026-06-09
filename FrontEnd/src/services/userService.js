import api from "../lib/api";

export const changePassword = (currentPassword, newPassword) =>
  api.post("/users/change-password", { currentPassword, newPassword });

export const updateAvatar = (formData) =>
  api.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getProfile = () => api.get("/users/me");
