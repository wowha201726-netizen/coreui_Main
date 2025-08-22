import { useMemo, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const isTokenValid = (user) => {
  if (!user?.tokenExpiry) return false
  return new Date().getTime() < user.tokenExpiry
}

  const [user, setUser] = useLocalStorage("user", null)
  const isAuthenticated = !!user
  const navigate = useNavigate()

  // login accepts the user data and an optional redirect path
  const login = async (data, redirectTo = "/") => {
    setUser(data)
    navigate(redirectTo, { replace: true })
  };

  const logout = async () => {
  try {
    await fetch("/api/logout", { method: "POST" })
  } catch (err) {
    console.error("Logout failed:", err)
  } finally {
    setUser(null)
    navigate("/login", { replace: true })
  }
}

  const value = useMemo(
    () => ({
      user,
      isAuthenticated, // now ProtectedRoute can use this
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
