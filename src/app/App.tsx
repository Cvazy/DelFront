import React, { Suspense } from "react";
import AppRouter from "app/providers/Routers/ui/AppRouter";
import { Loader } from "shared";
import "./index.css";
import styles from "./App.module.css";
import { ThemeProvider } from "app/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <div className={styles.app}>
          {/*Header*/}

          <main className={styles.main}>
            <AppRouter />
          </main>

          {/*Footer*/}
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
