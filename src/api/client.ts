// Временная заглушка доо установкии axios
// После установки зависимостей (npm install) замените этот файл на:
/*
import axios from "axios";

const api = axios.create({
  baseURL: "https://ofc-test-01.tspb.su",
  timeout: 10000,
});

export { api };
*/

// Простая заглушка для axios с типизацией
const createAxiosStub = () => ({
  get: async <T = any>(url: string): Promise<{ data: T }> => {
    console.log('Axios stub: GET', url);
    // Возвращаем тестовые данные
    return {
      data: [
        {
          id: 1,
          name: "Toyota",
          model: "Camry", 
          year: 2021,
          color: "red",
          price: 21000,
          latitude: 55.753332,
          longitude: 37.621676
        },
        {
          id: 2,
          name: "Honda",
          model: "Civic",
          year: 2020,
          color: "blue", 
          price: 18000,
          latitude: 55.751244,
          longitude: 37.618423
        }
      ] as T
    };
  }
});

const api = createAxiosStub();

export { api };