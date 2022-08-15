import { useRoute } from 'vitepress'

export const getGithubUrl = (path?: string) => {
    const route = useRoute()
    return `https://github.com/zuramai/refactoring/tree/main/docs/${route.path}/${path}`
}