/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        // const rs = await axios.get("http://localhost:8888/auth/me", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        const rs = await axios.get(`${axios.defaults.baseURL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(rs.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
