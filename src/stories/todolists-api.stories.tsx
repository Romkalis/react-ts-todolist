import axios from "axios";
import React, { useEffect, useState } from "react";

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
    let promise = axios.get(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      axiosSettings
    );
    // let promise = axios.get(
    //   "https://jsonplaceholder.typicode.com/todos",
    //   axiosSettings
    // );
    promise.then((responce) => {
      setState(responce.data);
      console.log(state);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodoLists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // post запрос отличается тем, что в нем указывается payload, обыч но это какой то js объект, указывается сразуц за url
    axios
      .post(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        // "https://jsonplaceholder.typicode.com/todos",
        {
          title: "Todo List номер раз, два",
        },

        axiosSettings
      )
      .then((response) => {

        setState(response.data)
        
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};


// не связывается с сервером it-kamasutra // cors Error



// export const DeleteTodoLists = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {


//     // зедсь делаем запрос и ответ забрасыяваем в стейт
//     // дальше будем отображдать его на странице
//   }, []);

//   return <div>{JSON.stringify(state)}</div>;
// };

// export const UpdateTodoLists = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {

//     axios.put("https://jsonplaceholder.typicode.com/todos", { id: 5, title: 'Changed ToDo' } ,axiosSettings)
//     .then( response => {
//         setState(response.data)
//     })

//   }, []);

//   return <div>{JSON.stringify(state)}</div>;
// };
