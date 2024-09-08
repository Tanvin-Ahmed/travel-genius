import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorBoundary from "../custom/shared/error-boundary";

import { ComponentType, lazy, Suspense } from "react";
import useLoader from "../../hook/use-loader";
import PrivateRoute from "./private-route";
import { getSingleTrip } from "../../firebase/db-action";

type LoadableProps = {
  [key: string]: unknown;
};

const Loadable = <P extends LoadableProps>(Component: ComponentType<P>) => {
  const LoadableComponent = (props: P) => {
    const { Loader } = useLoader();

    return (
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Loader color="#EA580C" width="60" height="60" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

  return LoadableComponent;
};

const App = Loadable(lazy(() => import("../../App")));
const HomePage = Loadable(lazy(() => import("../../pages/home-page")));
const AuthPage = Loadable(lazy(() => import("../../pages/auth")));
const CreateTripPage = Loadable(lazy(() => import("../../pages/create-trip")));
const TripsPage = Loadable(lazy(() => import("../../pages/trips")));
const TripDetailsPage = Loadable(
  lazy(() => import("../../pages/trip-details"))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <AuthPage />,
      },
      {
        path: "create-trip",
        element: (
          <PrivateRoute>
            <CreateTripPage />
          </PrivateRoute>
        ),
      },
      {
        path: "trips",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <TripsPage />,
          },
          {
            path: ":id",
            element: <TripDetailsPage />,
            loader: async ({ params }) => await getSingleTrip(params.id!),
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
