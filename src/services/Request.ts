export function sendSecuredRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const requestOptions = {
        ...options,
        headers: {
            Authorization:  "Bearer " + localStorage.getItem("BEARER_TOKEN"),
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
