import { API_URLS } from "@/constants/apiUrls";

export const getApiEndpoint = (endpoint: string): string | undefined => {
    switch (endpoint) {
        case "pokemon":
            return API_URLS.pokemon;
        case "ejemplo":
            return API_URLS.ejemplo;
        default:
            console.warn(`Endpoint no reconocido: ${endpoint}`);
            return undefined;
    }
};