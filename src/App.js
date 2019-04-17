import React, { createContext, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useAuthReducer } from "./reducers";
import { checkLoginStatus } from "./firebase/authActions";

const AuthCheck = lazy(() => import("./pages/AuthCheck"));
const MainPage = lazy(() => import("./pages/Main"));
const Budget = lazy(() => import("./pages/Budget"));
const NewExpense = lazy(() => import("./pages/NewExpense"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Reports = lazy(() => import("./pages/Reports"));
const Login = lazy(() => import("./pages/Login"));

export const Dispatch = createContext();

function App() {
  const [authState, dispatchAuth] = useAuthReducer();

  const dispatch = action => [dispatchAuth].forEach(fn => fn(action));

  useEffect(() => {
    checkLoginStatus(dispatch);
  }, []);

  return (
    <div className="App">
      <Dispatch.Provider value={{ dispatch }}>
        <BrowserRouter>
          <Suspense fallback={<div>Hmmmmmm</div>}>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <AuthCheck auth={authState} {...props} />}
              />
              <Route
                path="/login"
                render={props => <Login auth={authState} {...props} />}
              />
              <Route path="/register" component={Register} />
              <Route
                path="/main"
                render={props => <MainPage auth={authState} {...props} />}
              />
              <Route path="/new-expense" component={NewExpense} />
              <Route path="/reports" component={Reports} />
              <Route path="/budget" component={Budget} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Dispatch.Provider>
    </div>
  );
}

export default App;
