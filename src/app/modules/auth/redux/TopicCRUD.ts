import { api } from "../../../../infra/api";

export function createTopic(data: any) {
  return api.post("/topics", data);
}

export function deleteTopic(id: string) {
  return api.delete(`/topics/${id}`);
}