import {Task} from "./Task.tsx";

export default {
  title: 'Task Component',
  component: Task
}

export const TaskExample = () => {
  return (
  <>

    // пока не понял как решать проблему с редаксом, так как данные приходят из провайдера.


    {/*<Task*/}
    {/*  task={{id: '1', title: 'taskTitle - 1', isDone: true}}*/}
    {/*  todolistId={'123'}*/}
    {/*/>*/}
    {/*<Task*/}
    {/*  task={{id: '2', title: 'taskTitle - 2', isDone: false}}*/}
    {/*  todolistId={'123'}*/}
    {/*/>*/}
  </>
  )
}
