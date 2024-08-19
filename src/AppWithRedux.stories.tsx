import AppWithRedux from "./AppWithRedux";
import { Provider } from "react-redux";
import  {store}  from "./state/store.ts";

export default {
  title: "AppWithReduxComponent",
  component: AppWithRedux,
};

export const AppWithReduxBaseExample = () => {
  return (
      <Provider store={store}>
        <AppWithRedux />
      </Provider>
  );
};
