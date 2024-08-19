import { ReduxStoreProviderDecorator } from "../stories/ReduxStoreProviderDecorator.tsx";
import { Task } from "./Task.tsx";

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator]
};

export const TaskExample = () => {
  return (
    <>
      <Task
        task={{ id: "1", title: "taskTitle - 1", isDone: true }}
        todolistId={"123"}
      />
      <Task
        task={{ id: "2", title: "taskTitle - 2", isDone: false }}
        todolistId={"123"}
      />
    </>
  );
};
