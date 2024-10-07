import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
  <>
  {
    // Basically, if authenticated, then it should navigate to the home page. But if not authenticated, then it should render the child route,
    // that matches the current URL. This is the purpose of the Outlet component. It renders the child route that matches the current URL.
  }
    {
      isAuthenticated ? <Navigate to="/" /> : (
        <>
          <section
            className="flex flex-1 justify-center items-center flex-col py-10"
          >
            <Outlet /> 
          </section>

          <img 
            src="/assets/images/side-img.svg"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )
    }
  </>
  )
}

export default AuthLayout;