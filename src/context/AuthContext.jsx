import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // USER DATA (from login)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // REGISTERED EVENTS
  const [registeredEvents, setRegisteredEvents] = useState(
    JSON.parse(localStorage.getItem("registeredEvents")) || []
  );

  // SAVE USER TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // SAVE REGISTERED EVENTS TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  // LOGIN FUNCTION (mock login)
  const login = (email, password) => {
    const loggedUser = { email };
    setUser(loggedUser);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    setRegisteredEvents([]);
    localStorage.removeItem("user");
    localStorage.removeItem("registeredEvents");
  };

  // REGISTER FOR EVENT FUNCTION
  const registerEvent = (event) => {
    if (!registeredEvents.find((e) => e.id === event.id)) {
      setRegisteredEvents([...registeredEvents, event]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registeredEvents,
        registerEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
