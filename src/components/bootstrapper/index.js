import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const DefaultWrapper = ({ children, AdditionalWrappers }) => {
  if (AdditionalWrappers) {
    return (
      <Router>
        <AdditionalWrappers>{children}</AdditionalWrappers>
      </Router>
    );
  }
  return <Router>{children}</Router>;
};

const BootStrapper = ({ routes, AdditionalWrappers }) => {
  return (
    <DefaultWrapper AdditionalWrappers={AdditionalWrappers}>
      <div style={{ width: "calc(100% - 175px)", marginLeft: "175px" }}>
        <Switch>
          {routes.map(({ path, Component }) => {
            const routeKey = `app-home-${path}`;
            return (
              <Suspense key={routeKey} fallback={<div>loading...</div>}>
                <Route path={path}>
                  <Component />
                </Route>
              </Suspense>
            );
          })}
        </Switch>
      </div>
    </DefaultWrapper>
  );
};

export default BootStrapper;
