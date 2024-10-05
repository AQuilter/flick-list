import { NextResponse } from "next/server";

// export interface Movie {
//     id: number;
//     title: string;
//     overview: string;
//     popularity: number; 
//     poster_path?: string | null;
//     backdrop_path?: string | null;
//     release_date: string;
//     genre_ids: number[];
// }

// export interface SearchMovie {
//     page: number;
//     results: Movie[];
//     total_pages: number;
//     total_results: number;
// }

export default async function GET(query : string, page : number = 1) {

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMBD_API_KEY}`
                }
            }

        )
        
        const data = await res.json();
        

        if (res.ok) return {
            code: 200,
            message: "Movie retrieved successfully!",
            data: data
        }

    } catch (error) {
        console.log("Error in seachMovie GET(): ", error)

        return {
            code: 500,
            message: "Could not retrieve movie at this time due to internal error!",
        }
    }
}
