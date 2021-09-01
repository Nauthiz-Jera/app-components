import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { rootStore } from "@workshop/app-core-utils";
import { useNavState } from "@workshop/app-nav";

const DefaultWrapper = ({ children, AdditionalWrappers }) => {
  if (AdditionalWrappers) {
    return <AdditionalWrappers>{children}</AdditionalWrappers>;
  }
  return children;
};

const BootStrapper = ({ appName, routes, AdditionalWrappers, store }) => {
  const [{ isMenuOpen }] = useNavState();
  const adjustSize = isMenuOpen ? "175px" : "75px";
  if (store) {
    rootStore.add(appName, store);
  }

  return (
    <Provider store={rootStore.store}>
      <DefaultWrapper AdditionalWrappers={AdditionalWrappers}>
        <div
          style={{
            width: `calc(100% - ${adjustSize})`,
            marginLeft: adjustSize,
          }}
        >
          <Suspense fallback={<div>loading...</div>}>
            <Router basename="/">
              <Switch>
                <Route exact path="/" />
                {routes.map(({ exact, path, Component }) => {
                  const routeKey = `app-${appName}-${path}`;
                  return (
                    <Route
                      key={routeKey}
                      exact={!!exact}
                      path={`/${appName}${path}`}
                    >
                      <Component />
                    </Route>
                  );
                })}
              </Switch>
            </Router>
          </Suspense>
        </div>
      </DefaultWrapper>
    </Provider>
  );
};

export default BootStrapper;
