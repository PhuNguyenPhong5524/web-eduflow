import api from "../lib/api";

export const changePassword = (currentPassword, newPassword, confirmPassword) =>
  api.put("/users/change-password", {
    currentPassword,
    newPassword,
    confirmPassword,
  });

export const updateAvatar = (formData) =>
  api.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getProfile = () => api.get("/users/me");
