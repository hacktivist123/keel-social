import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Make API request for authentication using email and password
      const response = await fetch(process.env.NEXT_PUBLIC_API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          createIfNotExists: true,
          emailPassword: {
            email,
            password,
          },
        }),
      });

     ;

     if (response.ok) {
      const data = await response.json();

      // Extract the token from the API response
      const newAccessToken = data.token;

      // Set the access token in state
      setAccessToken(newAccessToken);

      // Update authentication state
      setIsAuthenticated(true);

      return true;
    } else {
      // Handle authentication error
      return false;
    }
  } catch (error) {
    // Handle fetch error
    return false;
  }
};


  const logout = () => {
    // Clear the access token from state
    setAccessToken(null);

    // Update authentication state
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
