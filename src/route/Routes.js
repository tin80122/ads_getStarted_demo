import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

const GetStarted = lazy(() => import("./getStarted/view"));
const Routes = () => {
  <Switch>
    <Route path="/getStartedDemo" component={GetStarted} />
  </Switch>;
};
export default Routes;
