import { API_HOST } from "../utils/constants";

// Como es asincrona y puede dar error se coloca async
export async function getPokemonApi() {
  try {
    //   Limite de 20 pokemons por pagina
    // Que empiece por el pokemon 0
    const url = `${API_HOST}agricultor`;
    // Petición al servidor
    const response = await globalThis.fetch(url);
    // Me devuelve los datos en un .json
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}
