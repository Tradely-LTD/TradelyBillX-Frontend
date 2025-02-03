import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./app-router";
import "./App.css";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "./common/ui/error-boundary";

function App() {
  return (
    <>
      <PersistGate persistor={persistor} loading={null}>
        <Provider store={store}>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </Provider>
      </PersistGate>
    </>
  );
}

export default App;
