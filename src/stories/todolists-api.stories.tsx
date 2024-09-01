import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolistsAPI";

export default {
  title: "API",
};

const axiosSettings = {
  withCredentials: true, // настройка добавит к запросу куки из браузера
  headers: {
    "API-KEY": "20dd8944-aeb9-4e0d-b6a6-3d24950255b6",
    // "Content-Type": "application/json",
  },
};

export const GetTodoLists = () => {
  const [state, setState] = useState<any>({ name: "1Roman" });
  useEffect(() => {
    let promise = todolistsAPI.getTodolists();

    promise.then((responce) => {
      setState(responce.data);
      console.log(state);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodoLists = () => {
  const [state, setState] = useState<any>(null);

  const title = 'новый TodoList'
  useEffect(() => {
    // post запрос отличается тем, что в нем указывается payload, обыч но это какой то js объект, указывается сразуц за url
      todolistsAPI.createTodoLists(title).then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

// не связывается с сервером it-kamasutra // cors Error

export const DeleteTodoLists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const id = '3q';

    todolistsAPI.deleteTodolist(id)
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodoLists = () => {
  const [state, setState] = useState<any>(null);

  const id = 'x5';

  useEffect(() => {
    todolistsAPI.changeTodolist(id)
      .then((response) => {
        setState(response.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
