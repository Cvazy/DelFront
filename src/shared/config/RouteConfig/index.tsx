import { RouteProps } from "react-router-dom";
import {
  CreateDeliveryPage,
  DeliveryListPage,
  EditDeliveryPage,
  LoginPage,
  NotFoundPage,
  ReportPage,
} from "pages";

export enum AppRoutes {
  LOGIN = "login",
  DELIVERY_LIST = "delivery_list",
  CREATE_DELIVERY = "create_delivery",
  EDIT_DELIVERY = "edit_delivery",
  REPORT = "report",
  NOT_FOUND = "not_found",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.DELIVERY_LIST]: "/",
  [AppRoutes.CREATE_DELIVERY]: "/create",
  [AppRoutes.EDIT_DELIVERY]: "/delivery/:id",
  [AppRoutes.REPORT]: "/report",
  [AppRoutes.NOT_FOUND]: "*",
};

export const RouteConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePaths.login,
    element: <LoginPage />,
  },

  [AppRoutes.DELIVERY_LIST]: {
    path: RoutePaths.delivery_list,
    element: <DeliveryListPage />,
  },

  [AppRoutes.CREATE_DELIVERY]: {
    path: RoutePaths.create_delivery,
    element: <CreateDeliveryPage />,
  },

  [AppRoutes.EDIT_DELIVERY]: {
    path: RoutePaths.edit_delivery,
    element: <EditDeliveryPage />,
  },

  [AppRoutes.REPORT]: {
    path: RoutePaths.report,
    element: <ReportPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
