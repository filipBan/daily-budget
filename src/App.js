import React, { createContext, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import theme from "./theme";
import { useAuthReducer } from "./reducers";
import { checkLoginStatus } from "./firebase/authActions";

const AuthCheck = lazy(() => import("./pages/AuthCheck"));
const MainPage = lazy(() => import("./pages/Main"));
const Budget = lazy(() => import("./pages/Budget"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Reports = lazy(() => import("./pages/Reports"));
const Login = lazy(() => import("./pages/Login"));

export const State = createContext();

function App() {
  const [auth, dispatchAuth] = useAuthReducer();

  const dispatch = action => [dispatchAuth].forEach(fn => fn(action));

  useEffect(() => {
    checkLoginStatus(dispatch);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <State.Provider value={{ dispatch, auth }}>
          <BrowserRouter>
            <Suspense fallback={<div>Fallback</div>}>
              <Switch>
                <Route exact path="/" component={AuthCheck} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/app" component={App} />
                <Route path="/main" component={MainPage} />
                <Route path="/reports" component={Reports} />
                <Route path="/budget" component={Budget} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </State.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
