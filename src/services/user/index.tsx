import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: (id: string, data: any) =>
    instance.put("/api/user", { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),
};

export default userServices;
