import axios from "axios";
import { getApiEndpoint } from "@/hooks/getApiEndpoint";

const apiClient = axios.create({
    baseURL: getApiEndpoint("pokemon"),
    timeout: 8000,
    headers: { "Content-Type": "application/json" },
});

//Centralizado de respuestas y errores de conectividad en Interceptor
apiClient.interceptors.response.use(
    (response) => response, // Response exitosa (2xx), se envía directo
    (error) => {
        let errorMessage = "Unexpected error.";

        if (error.code === "ECONNABORTED") {
            errorMessage = "The connection took longer than expected. Check your internet connection..";
        } else if (!error.response) { // Sin internet / servidor caído
            errorMessage = "There is no connection to the server. Check your internet connection.";
        } else {
            const status = error.response.status;
            if (status === 401) errorMessage = "Session expired. Please log in again.";
            if (status === 404) errorMessage = "The requested resource doesn't exist.";
            if (status >= 500) errorMessage = "Server error. Please try again later.";
        }

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status || null,
            originalError: error,
        });
    },
);

export default apiClient;
