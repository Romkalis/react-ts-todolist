import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator.tsx";

export default {
  title: "AppWithReduxComponent",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
};

export const AppWithReduxBaseExample = () => {
  return (
        <AppWithRedux />
  );
};
