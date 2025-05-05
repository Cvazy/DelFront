import React, { Suspense } from "react";
import { Loader } from "shared";
import { Route, Routes } from "react-router-dom";
import { RouteConfig, AppRoutes } from "shared/config/RouteConfig";
import { Navbar } from "widgets/Navbar";
import { RequireAuth } from "app/providers/AuthProvider";
import { Box } from "@mui/material";

const drawerWidth = 240;

function AppRouter() {
  const renderWithAuth = (route: AppRoutes) => {
    const { element, path } = RouteConfig[route];
    
    // Для страницы логина не требуется авторизация
    if (route === AppRoutes.LOGIN) {
      return <Route key={path} path={path} element={element} />;
    }
    
    // Для остальных страниц требуется авторизация
    return (
      <Route
        key={path}
        path={path}
        element={
          <RequireAuth>
            <Box sx={{ 
              display: 'flex',
              minHeight: '100vh',
              backgroundColor: 'background.default',
              color: 'text.primary'
            }}>
              <Navbar />
              <Box
                component="main"
                sx={{ 
                  flexGrow: 1, 
                  p: 3,
                  ml: { md: `${drawerWidth}px` },
                  mt: 2
                }}
              >
                {element}
              </Box>
            </Box>
          </RequireAuth>
        }
      />
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {Object.values(AppRoutes).map((route) => renderWithAuth(route))}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
