import { Provider } from "react-redux"

import { combineReducers, createStore} from 'redux'
import { todolistsReducer } from "../state/todolist-reducer.ts";
import { tasksReducer } from "../state/tasks-reducer.ts";
import { AppRootState } from "../state/store.ts";
import { todolistId1 } from "../state/tasks-reducer.ts";
import { v1 } from "uuid";


const exampleState: AppRootState = {
  todolists: [
    {id: todolistId1, title: 'What to buy', filter: 'all',}], 
  tasks: {
    [todolistId1]: [
      {id: v1(), title: "Css", isDone: true},
      {id: v1(), title: "SMTHNG", isDone: false},
      {id: v1(), title: "cleanTree", isDone: true},
    ],
  },
}
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})


const storybookState: AppRootState = createStore(rootReducer, exampleState)
// здесь передаем вторым параметром стейт, и в этом случае, редакс воспринимает его как инициализационный стейт
// например это мб актуально для сохранения стейта в локал сторадж, и при загрузке приложения брать его оттуда.


export  const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storybookState}> {story()} </Provider>;
}