import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { rootStore } from "@workshop/app-core-utils";
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

const BootStrapper = ({ appName, routes, AdditionalWrappers, store }) => {
  if (appName && store) {
    rootStore.add(appName, store);
  }

  return (
    <Provider store={rootStore.store}>
      <DefaultWrapper AdditionalWrappers={AdditionalWrappers}>
        <div style={{ width: "calc(100% - 175px)", marginLeft: "175px" }}>
          <Switch>
            {routes.map(({ path, Component }) => {
              const routeKey = `app-${appName}-${path}`;
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
    </Provider>
  );
};

export default BootStrapper;
