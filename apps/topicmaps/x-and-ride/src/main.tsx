import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
// import {
//   GazDataProvider,
//   SelectionProvider,
// } from "@carma-appframeworks/portals";
// import App from "./app/App";
// import { gazDataConfig } from "./config/gazData";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// if (typeof global === "undefined") {
//   window.global = window;
// }

root.render(
  <StrictMode>
    <div>Test</div>
  </StrictMode>
);

// root.render(
//   <StrictMode>
//     <GazDataProvider config={gazDataConfig}>
//       <SelectionProvider>
//         <App />
//       </SelectionProvider>
//     </GazDataProvider>
//   </StrictMode>
// );
