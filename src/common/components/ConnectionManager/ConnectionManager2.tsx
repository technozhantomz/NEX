// import counterpart from "counterpart";
// import React from "react";

// import { LoadingIndicator } from "..";
// import { useSettingsContext } from "../../providers";

// import { useConnectionManager } from "./hooks";

// type Props = {
//   children: React.ReactNode;
// };

// export const ConnectionManager = ({ children }: Props): JSX.Element => {
//   const { apiServer } = useSettingsContext();
//   const {
//     apiConnected,
//     apiError,
//     syncError,
//     status,
//     showNodeFilter,
//     nodeFilterHasChanged,
//   } = useConnectionManager();
//   const renderLoadingScreen = () => {
//     let server = apiServer;
//     if (!server) {
//       server = "";
//     }
//     return (
//       <React.Fragment>
//         <LoadingIndicator
//           loadingText={
//             status ||
//             counterpart.translate("app_init.connecting", {
//               server: server,
//             })
//           }
//         >
//           {showNodeFilter && (
//             <div>
//               <NodeSelector onChange={this._onNodeFilterChange.bind(this)} />
//               {nodeFilterHasChanged && (
//                 <div style={{ marginTop: "1rem" }}>
//                   Please reload for the changes to take effect
//                 </div>
//               )}
//             </div>
//           )}
//         </LoadingIndicator>
//       </React.Fragment>
//     );
//   };

//   if (!apiConnected) {
//     return (
//       <div>
//         {!apiError ? (
//           renderLoadingScreen()
//         ) : syncError ? (
//           <SyncError />
//         ) : (
//           <InitError />
//         )}
//       </div>
//     );
//   }
//   return <>{children}</>;
// };
