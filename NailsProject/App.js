//@ts-ignore
import { Provider } from "react-redux";
//@ts-ignore
import Store  from "./src/redux/store";
//@ts-ignore
import Router from './src/navigators/Router'

export default function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}
