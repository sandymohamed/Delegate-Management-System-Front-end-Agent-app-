// import axios from "axios";
// import { createContext, useContext, useState, useEffect } from "react";
// import { API_BASE_URL } from '../global-config';

// const AuthContext = createContext();

// // AuthProvider component to wrap the app and provide authentication context
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(false);

//     // check local storage for token
//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//         setLoading(false);


//     }, []);



//     const login = async (userData) => {

//         const result = await axios.post(`${API_BASE_URL}/auth/agent`, userData)

//         console.log("result", result)

//         if (result.data.success) {
//             setUser(result.data.data)
//             setToken(result.data.payload)
           
            
//             localStorage.setItem('token', result.data.payload)
//             fetchUserData(result.data.payload);

//             // localStorage.setItem('user', JSON.stringify(result.data.data))
//         } else {
//             console.log("error", result.data.error)
//             alert(result.data.error);
//             throw new Error(result.data.error);

//         }
//         // setToken(token);
//         // localStorage.setItem('token', token);
//     };

//     const fetchUserData = async () => {

//         const result = await axios.get(`${API_BASE_URL}/auth/account`, {
//             headers: { Authorization: `Bearer ${token}` },
//         })

//         console.log("result", result)
//         setUser(result.data.data);
//         // setToken(token);
//         // localStorage.setItem('token', token);
//     };


//     // Logout function
//     const logout = () => {
//         localStorage.removeItem('token');
//         // localStorage.removeItem('user');
//         setToken(null);
//         // setUser(null);
//     };


//     // value object to be provided to consuming components

//     const value = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//         fetchUserData,
//     }

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// // Custom hook to access the authentication context
// export const useAuth = () => {
//     return useContext(AuthContext);
// }




import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from '../global-config';
import { TypeUser } from "../types/user";
import { AnyMessageParams } from "yup";
// -----------------------------------------
type TypeAuthProviderProps = {
    children: React.ReactNode;
};
// -----------------------------------------
const AuthContext = createContext<{
  user: TypeUser | null;
  token: string | null;
  loading: boolean;
  login: (userData: TypeUser) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  fetchUserData: async () => {},
});
export const AuthProvider: React.FC<TypeAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<TypeUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Initialize auth state from local storage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            validateToken(storedToken);
        } else {
            setLoading(false); // No token, stop loading
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/account`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setToken(token);
                setUser(response.data.user);
            } else {
                logout(); // Token invalid or expired
            }
        } catch (error) {
            console.error("Token validation failed:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData: TypeUser) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/auth/agent`, userData);

            if (result.data.success) {
                const { data: user, payload: token } = result.data;
                setUser(user);
                setToken(token);
                localStorage.setItem('token', token);
            } else {
                throw new Error(result.data.error);
            }
        } catch (error: any) {
            console.error("Login failed:", error);
            alert(error?.message);
            throw error;
        }
    };

    const fetchUserData = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/auth/account`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(result.data.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        fetchUserData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const UserAuth = useContext(AuthContext)
    if(!UserAuth){
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return UserAuth
};
