import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
  addTask: (fn: Function, id: string) => void;
  todolistId: string;
}
export const AddItemForm = ({ addTask, todolistId }) => {

  const [taskText, setTaskText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTaskText(evt.target.value)
    setError('')
  }
  const onKeydownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (taskText.trim() === '') {
      setError('Field is required')
      return
    }
    addTask(taskText.trim(), todolistId)
    setTaskText('')
  }

  return (
    <>
      <div>
        <input onChange={onChangeHandler}
               onKeyDown={onKeydownHandler}
               className={error ? 'error' : ''}
               type="text"
               value={taskText}/>
        <button onClick={addTaskHandler}>+</button>
        {error && <span className="error-message">{error}</span>}
      </div>
    </>
  )
}
