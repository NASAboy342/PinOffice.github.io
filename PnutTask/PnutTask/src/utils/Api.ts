
export class Api {
    static async Post<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
        const backendBaseUrl = 'http://pnut.local.com:400/';
        try {
            const response = await fetch(`${backendBaseUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}`);
            }

            return response.json() as Promise<TResponse>;
        } catch (error) {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }
}