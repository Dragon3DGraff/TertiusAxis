/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { TertiusAxis } from "./engine/TertiusAxis.js";
import { createRoot } from "react-dom/client";
import { StartPage } from "./UI/startPage/StartPage";
import "./main.css";

import Authentication from "./UI/Authentication/Authentication";
import AuthInMainMenu from "./UI/Authentication/AuthInMainMenu";
// import ReactPanel from "./UI/ReactPanel";
// import MatcapImages from "./UI/MatcapImages.js";

const container = document.getElementById("UI");
const root = createRoot(container!);

const onStart = () => {
  const editor = new TertiusAxis();
  editor.init();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <StartPage onStart={onStart} />
      </ErrorBoundary>
    ),
  },
]);

// let matcapImages = new MatcapImages();
root.render(
  <RouterProvider router={router} />

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
