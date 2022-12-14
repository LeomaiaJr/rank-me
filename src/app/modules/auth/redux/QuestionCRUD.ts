import { api } from "../../../../infra/api";

export function createQuestion(question: any) {
  return api.post("/questions", question);
}

export function deleteQuestion(id: string) {
  return api.delete(`/questions/${id}`);
}

export function getQuestionById(id: string) {
  return api.get(`questions`, { params: { id: id } });
}

export function updateQuestion(question: any) {
  const { id, ...rest } = question;
  return api.patch(`/questions/${question.id}`, { ...rest });
}

export function getQuestionsAvailable(query: any) {
  return api.get(`/questions/availableToAnswer`, { params: query });
}

export function studentCanAnswer(query: any) {
  return api.get(`/questions/user-can-answer`, { params: query });
}