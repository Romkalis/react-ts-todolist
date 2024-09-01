import axios from "axios";

const axiosSettings = {
  withCredentials: true, // настройка добавит к запросу куки из браузера
  headers: {
    "API-KEY": "20dd8944-aeb9-4e0d-b6a6-3d24950255b6",
    // "Content-Type": "application/json",
  },
};

export const todolistsAPI = {
  getTodolists() {
    let promise = axios.get(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      axiosSettings
    );
    // let promise = axios.get(
    //   "https://jsonplaceholder.typicode.com/todos",
    //   axiosSettings
    // );

    return promise;
  },

  createTodoLists(payload: string) {
    return axios.post(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      // "https://jsonplaceholder.typicode.com/todos",
      {
        title: payload,
      },
      axiosSettings
    );
  },

  deleteTodolist(id: number) {
    return axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      axiosSettings
    );
  },

  changeTodolist(id: number) {
    return axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { id: id, title: "Changed ToDo" },
      axiosSettings
    );
  },
};
