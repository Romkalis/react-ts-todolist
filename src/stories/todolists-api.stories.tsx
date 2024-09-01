
import axios from 'axios';
import React, {useEffect, useState} from "react";

export default {
    title: 'API',
}

const axiosSettings = {
    withCredentials: true // настройка добавит к завпросу куки из 
    //браузера, если она там есть, для авторизации, без настрйоки получим ошибку 401 - неавторизован!
}

export const GetTodoLists = () => {
    const [state,  setState] = useState<any>({name: '1Roman'})
    useEffect( () => {

    //    let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', axiosSettings)
       let promise = axios.get('https://jsonplaceholder.typicode.com/todos?10')
    
       promise.then( responce => {
        setState(responce.data)
        console.log(state)
    })
       
        // зедсь делаем запрос и ответ забрасыяваем в стейт
        // дальше будем отображдать его на странице
    
     }
    , [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state,  setState] = useState<any>(null)
    useEffect( () => {
        // зедсь делаем запрос и ответ забрасыяваем в стейт
        // дальше будем отображдать его на странице
    }
    , [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state,  setState] = useState<any>(null)
    useEffect( () => {
        // зедсь делаем запрос и ответ забрасыяваем в стейт
        // дальше будем отображдать его на странице
    }
    , [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {
    const [state,  setState] = useState<any>(null)
    useEffect( () => {
        // зедсь делаем запрос и ответ забрасыяваем в стейт
        // дальше будем отображдать его на странице
    }
    , [])

    return <div>{JSON.stringify(state)}</div>
}
