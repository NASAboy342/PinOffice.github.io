export default async function useApiCalling(){
    interface IProduct {
        id: number;
        title: string;
        description: string;
        price: number;
        brand: string;
        images: Array<string>
    }
    const { data: produactDatas } = await useFetch<IProduct[]>('https://dummyjson.com/products');
    return {
        produactDatas
    }
}