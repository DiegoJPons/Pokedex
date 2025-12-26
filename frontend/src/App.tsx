import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home/HomePage.tsx";
import AuthCallbackPage from "./Pages/auth-callback/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import TeamsPage from "./Pages/teams/TeamsPage.tsx";
import EntryPage from "./Pages/entry-page/EntryPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/pokemon/:id" element={<EntryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
