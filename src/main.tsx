/**
 * @author Dragon3DGraff / http://dragon3dgraff.ru/
 */

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { TertiusAxis } from "./engine/TertiusAxis.js";
import { createRoot } from "react-dom/client";
import { StartPage } from "./UI/startPage/StartPage";

// import Authentication from "./UI/Authentication/Authentication";
// import AuthInMainMenu from "./UI/Authentication/AuthInMainMenu";
// import ReactPanel from "./UI/ReactPanel";
// import MatcapImages from "./UI/MatcapImages.js";

const container = document.getElementById("UI");
const root = createRoot(container!);

const onStart=() =>{
  console.log("onStart");
  const editor = new TertiusAxis()
  editor.init();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage onStart={onStart} />,
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
