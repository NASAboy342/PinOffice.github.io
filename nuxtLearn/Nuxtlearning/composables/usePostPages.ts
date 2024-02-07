export default function usePostPages(){
    const posts = ref([
        {
            id: 1,
            title: 'Post-1',
            body: 'This-The-Body-1'
        },
        {
            id: 2,
            title: 'Post-2',
            body: 'This-The-Body-2'
        },
        {
            id: 3,
            title: 'Post-3',
            body: 'This-The-Body-3'
        },
        {
            id: 4,
            title: 'Post-4',
            body: 'This-The-Body-4'
        },
        {
            id: 5,
            title: 'Post-5',
            body: 'This-The-Body-5'
        }
    ])
    return {
        posts
    }
}