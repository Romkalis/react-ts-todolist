import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, onChange}) => {


  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [inputTitle, setInputTitle] = useState('')

  const onEditableActive = () => {
    setIsEditable(true)
    setInputTitle(title)
  }
  const onEditableDeactivated = () => {
    setIsEditable(false)
    onChange(inputTitle)
    setInputTitle('')
  }
  const onInputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(evt.target.value)
  }
  const onEnter = (evt) => {
    if (evt.key === 'Enter') {
      onEditableDeactivated()
    }
  }


  return isEditable
    ?
    <TextField
      id="outlined-basic"
      label="Input Text"
      variant="outlined"
      size={'small'}
      onKeyDown={onEnter}
      onBlur={onEditableDeactivated}
      value={inputTitle}
      onChange={onInputHandler}
      autoFocus/>

    : <span onDoubleClick={onEditableActive}>{title}</span>
})
