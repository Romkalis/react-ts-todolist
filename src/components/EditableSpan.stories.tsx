import {EditableSpan} from "./EditableSpan.tsx";
import {action} from "@storybook/addon-actions";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
}

export default {
  title: 'Editable Span Component',
  component: EditableSpan
}

const callback = action('OnChange was called')

export const EditableSpanBaseExpample = () => {
  return <EditableSpan title={"Заголовок"} onChange={callback} />
}
export const EditableSpanBaseExpample2 = () => {
  return <EditableSpan title={"ClickMe"} onChange={callback} />
}
