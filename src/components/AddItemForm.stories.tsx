import {AddItemForm} from "./AddItemForm.tsx";
import {action} from "@storybook/addon-actions"

export default {
  title: 'AddItemFormComponent',
  component: AddItemForm,
}

const callback  = action('Button "AddForm" was pressed')

export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={callback} />
}
