<template>
<pre>{{ response }}</pre>
</template>

<script lang="ts" setup>

class Api {
    static async Post<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
        const backendBaseUrl = 'http://info-stg-api.remotes.local/';
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
let response = {};
response = Api.Post<Object, Object>('GameProvider/get-all-gameprovider',{});
</script>
<style>

</style>
