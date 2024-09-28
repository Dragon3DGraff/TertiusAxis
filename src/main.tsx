/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { TertiusAxis } from "./engine/TertiusAxis";
import { createRoot } from "react-dom/client";
import { StartPage } from "./UI/startPage/StartPage";
import "./main.css";

// import Authentication from "./UI/Authentication/Authentication";
// import AuthInMainMenu from "./UI/Authentication/AuthInMainMenu";
import { EditorMode } from "./engine/types";
import { useState } from "react";
import { TertiusAxisContext } from "./UI/contexts/TertiusAxisContext";
// import ReactPanel from "./UI/ReactPanel";
// import MatcapImages from "./UI/MatcapImages.js";

const container = document.getElementById("UI");
const root = createRoot(container!);

const App = () => {
  const [editor, setEditor] = useState<TertiusAxis | null>(null);
  const onStart = (mode: EditorMode) => {
    setEditor(new TertiusAxis("TertiusAxisEditor", mode));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <TertiusAxisContext.Provider value={editor}>
            <StartPage onStart={onStart} />
          </TertiusAxisContext.Provider>
        </ErrorBoundary>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

// let matcapImages = new MatcapImages();
root.render(
  <App />

  //   <React.StrictMode>
  //     <Router history={history}>
  //       {/* <Authentication></Authentication> */}
  //       {/* <AuthInMainMenu></AuthInMainMenu> */}
  //     </Router>
  //     {/* <ReactPanel matcapImages={matcapImages}></ReactPanel> */}
  //   </React.StrictMode>,
  //   document.getElementById("MatCab")
);

// const editor = new TertiusAxis()
// editor.init();
