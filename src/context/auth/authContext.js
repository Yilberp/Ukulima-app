import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { API_HOST } from "../../utils/constants";
const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const url = `${API_HOST}auth/`;
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            isSignUp: false,
            userToken: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            isSignUp: true,
            userToken: null,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            isSignUp: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isSignUp: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const options = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        };
        try {
          const response = await globalThis.fetch(url + "login", options);
          const result = await response.json();
          if (result.token) {
            await SecureStore.setItemAsync("userToken", result.token);
            console.log("inicie sesion");
            dispatch({ type: "SIGN_IN", token: result.token });
          }
        } catch (error) {
          throw error;
        }
        //dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const options = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        };
        try {
          const response = await globalThis.fetch(
            url + "nuevoAgricultor",
            options
          );
          if (response.status === 200 && response.ok) {
            const options2 = {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                emailOrPhone: data.email,
                password: data.password,
              }),
            };
            console.log("registre");
            dispatch({ type: "SIGN_UP" });
            const response2 = await globalThis.fetch(url + "login", options2);
            const result2 = await response2.json();
            if (result2.token) {
              await SecureStore.setItemAsync("userToken", result2.token);
              console.log("inicie sesion2");
              dispatch({ type: "SIGN_IN", token: result2.token });
            }
          }
        } catch (error) {
          throw error;
        }
      },
    }),
    []
  );
  const data = {
    authContext,
    state,
  };
  return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>;
};

export { LoginProvider };
export default LoginContext;
