import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {PostAdd} from "@mui/icons-material";

type AddItemFormProps = {
  addItem: (title: string) => void;
}
export const AddItemForm: React.FC<AddItemFormProps> = ({addItem}) => {

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
    addItem(taskText.trim())
    setTaskText('')
  }

  return (
    <>
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          helperText={'Enter Value'}
          size={'small'}
          onChange={onChangeHandler}
          onKeyDown={onKeydownHandler}
          className={error ? 'error' : ''}
          error={!!error}
          type="text"
          value={taskText}/>


        <IconButton onClick={addTaskHandler} variant={'contained'} size={'small'}>
          <PostAdd color={'primary'}/>
        </IconButton>

      </div>
    </>
  )
}
