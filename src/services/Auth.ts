export default class {
    private sendSecuredRequest(url: string, options: RequestInit = {}): Promise<Response> {
        const requestOptions = {
            ...options,
            headers: {
                Authorization:  "Bearer " + localStorage.getItem("BEARER_TOKEN"),
                creditential: 'include'
            }
        }
        console.log(requestOptions)
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
}