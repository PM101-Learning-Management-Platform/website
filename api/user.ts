import axiosInstance from "../lib/axiosInstance";

interface UpdateUserProfilePayload {
  name?: string;
  date_of_birth?: string;
}

interface ChangeUserPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const UpdateUserProfile = async (userId: string, payload: UpdateUserProfilePayload) => {
  await axiosInstance.patch(`/users/${userId}`, payload)
}

export const ChangeUserPassword = async (userId: string, payload: ChangeUserPasswordPayload) => {
  await axiosInstance.patch(`/users/${userId}/change-password`, payload)
}

export const deleteMyAccount = async (userId: string) => {
  await axiosInstance.delete(`/users/${userId}`)
}
