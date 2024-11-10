import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_USER } from "./ContextConstant";

// We need to define how an empty user will look like



// We need to create the initial state of the user.
// incluse user which is set to Initial_user, isLoading to false (the intial state of a user), isAuthenticated to false,
// setUser used to set the user, setIsAuthenticated used to set the isAuthenticated, checkAuthUser used to check if the user is authenticated

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean, // means it will return false or a value as a boolean value
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // So basically yeah, here we are trying first check if the auth user exist by calling the getCurrentUser function which can be
  // found in the api.ts file that stores the appwrite functins.
  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(
      // Appwrite calls the cookie 'cookieFallback' and stores it as an array. So we are checking if the cookieFallback is an empty array or null
        localStorage.getItem('cookieFallback') === '[]' 
    ) {
      navigate('/sign-in')
    } else if (localStorage.getItem('cookieFallback') === null) {
      localStorage.setItem('cookieFallback', '[]')
    }

    checkAuthUser();
  }, [])
  
  const value = {
    user,
    isLoading,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

