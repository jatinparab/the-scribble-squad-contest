import React, { createContext, useEffect } from "react";
import { firebaseConfig } from "./config";
import app from "firebase/app";
import "firebase/database";

// we create a React Context, for this to be accessible
// from a component later
const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({ children }) => {
  let firebase = {
    app: null,
    database: null,
  };

  // check if firebase app has been initialized previously
  // if not, initialize with the config we saved earlier
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig);
    firebase = {
      app: app,
      database: app.database(),
    };
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
