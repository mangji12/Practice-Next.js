import { BookData } from "@/types";

export default async function fetchBooks(q?:string) : Promise<BookData[]> {
    let url = "https://12345-firebase-my-nextjs-app-1765356299225.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/book"

    if (q) {
        url += `/search?q=${q}`
    }

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error()
        }

        return await response.json()
    } catch (err) {
        console.error(err);
        return []
    }
}