import { NextResponse } from "next/server";


export async function GET() {

    const res = await fetch('https://api.themoviedb.org/3/search/movie?query=Deadpool&include_adult=false&language=en-US&page=1', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_BEARER_TOKEN}`
        }
    });
  
    if (!res.ok) {
        return NextResponse.json({
            error: "Could not fetch data at this time!",
        }, { status: 500 });
    }
  
    const data = await res.json(); // retrieve all data from API
    
    const final = data.results.map((movie: any) => {
        return {
            ...movie,
            poster_path: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null, // If there's no poster_path, set it to null
        };
    });

    return NextResponse.json({final})
  } 