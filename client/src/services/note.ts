import type { Note } from "../types/note";
import API from "./api";

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await API.get("/todos");
  return data.todos;
};

export const createNote = async (title: string): Promise<Note> => {
  const { data } = await API.post("/create", { title });
  return data.todo;
};

export const updateNote = async (id: string, title: string) => {
  await API.put(`/todos/${id}`, { title });
};

export const deleteNote = async (id: string) => {
  await API.delete(`/todos/${id}`);
};
