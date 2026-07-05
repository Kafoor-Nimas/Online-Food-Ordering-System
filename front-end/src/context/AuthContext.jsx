import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast.success("Login successful!");
      navigate("/");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast.success("Registration successful!");
      navigate("/");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await api.put("/users/profile", profileData);
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        setToken(data.token);
      }

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("auth_user", JSON.stringify(data.user));
      } else {
        setUser((prev) => ({ ...prev, ...profileData }));
        localStorage.setItem(
          "auth_user",
          JSON.stringify({ ...user, ...profileData }),
        );
      }

      toast.success(data.message || "Profile updated successfully");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update profile");
      return false;
    }
  };

  const logout = () => {
    toast.success("Logout successfull");
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        updateProfile,
        logout,
        navigate,
        showUserLogin,
        setShowUserLogin,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
