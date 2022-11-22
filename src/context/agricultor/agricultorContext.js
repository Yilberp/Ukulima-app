import * as React from "react";
import { API_HOST } from "../../utils/constants";
const AgricultorContext = React.createContext();

const AgricultorProvider = ({ children }) => {
  const url = `${API_HOST}auth/nuevoAgricultor`;
  const urlAgricultor = `${API_HOST}agricultor`;
  const [agricultores, setAgricultores] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const getAgricultores = async () => {
    setIsLoading(true);
    const res = await globalThis.fetch(urlAgricultor);
    const result = await res.json();
    if (res.ok) {
      setAgricultores(result);
      setIsLoading(false);
    }
  };
  const postData = async (data) => {
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await globalThis.fetch(url, options);
    if (res.ok) {
      console.log("registrado");
      setIsLoading(false);
    }
  };
  const putData = async (data) => {
    setIsLoading(true);
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await globalThis.fetch(urlAgricultor, options);
    if (res.ok) {
      console.log("actualizado");
      setIsLoading(false);
    }
  };
  const data = {
    getAgricultores,
    agricultores,
    isLoading,
    postData,
    putData,
  };
  return (
    <AgricultorContext.Provider value={data}>
      {children}
    </AgricultorContext.Provider>
  );
};

export { AgricultorProvider };
export default AgricultorContext;
