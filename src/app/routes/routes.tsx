import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import { Routes as PATH } from "../utils/constants";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={PATH.Root} element={<Navigate to={PATH.Home} />} />
      <Route path={PATH.Home} element={<Pages.Home />} />
      <Route path={PATH.AddClient} element={<Pages.AddClient />} />
      <Route path={PATH.Error} element={<Pages.Error />} />
    </Routes>
  );
};
