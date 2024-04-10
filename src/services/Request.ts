import { useAuthStore } from "@/stores"

export function sendSecuredRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const authStore = useAuthStore();

    const requestOptions = {
        ...options,
        headers: {
            Authorization:  "Bearer " + authStore.accessToken,
            creditential: 'include'
        }
    }
    if (options?.headers) {
        requestOptions.headers = {
            ...requestOptions.headers,
            ...options.headers
        }
    }
    return fetch(
        url, 
        requestOptions
    )
}
