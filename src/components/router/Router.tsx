import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "../custom/shared/error-boundary";

import { ComponentType, lazy, Suspense } from "react";
import useLoader from "../../hook/use-loader";

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
const CreateTripPage = Loadable(lazy(() => import("../../pages/create-trip")));

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
        path: "/create-trip",
        element: <CreateTripPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
