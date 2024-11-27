export async function fetchMovie(query: string) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_BEARER_TOKEN}`
        }
    });

    // Check if the response was successful
    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    // Parse the JSON response
    const data = await res.json();

    // Map through the results and format the poster path if available
    const final = data.results.map((movie: any) => {
        return {
            ...movie,
            poster_path: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null, // If there's no poster_path, set it to null
        };
    });

    // Return the final formatted data
    return final;
}