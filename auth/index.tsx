import { ReactNode, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer';


type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  token: string | null;
  userId: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("@user_token");
      if (storedToken) {
        const payload = JSON.parse(Buffer.from(storedToken.split('.')[1], 'base64').toString())
        setToken(storedToken);
        setUserId(payload.id);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("@user_token", token);
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    setToken(token);
    setUserId(payload.id);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user_token");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
