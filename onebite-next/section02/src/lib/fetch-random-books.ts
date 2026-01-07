import { BookData } from "@/types";

export default async function fetchRandomBooks() : Promise<BookData[]> {
    const url = "https://12345-firebase-my-nextjs-app-1765356299225.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/book/random"

    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error()
        }
        return await response.json()
    }
    catch(err) {
        console.error(err);
        return [];
    }
}