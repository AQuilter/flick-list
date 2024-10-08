'use client'

import { useState, useEffect } from 'react';


export default function Home() {

const [movieData, setMovieData] = useState(null);
const [error] = useState(null);


  const fetchMovie = async () => {
    try {
      const res = await fetch('api/FetchMovie');

      if (!res.ok) {
        throw new Error('Error in Home(): ');
      }

      const data = await res.json();
      setMovieData(data);

    } catch (err) {
           
      console.log("Error in fetchMovie()", err)

      return {
        code: 500,
        message: "Could not fetch movie at this time!"
      }
    }
  }; // fetchMovie
  

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}

      {movieData ? (
        <div>
          <h2>Movie Data:</h2>
          <pre>{JSON.stringify(movieData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    
    
    
    // <main>
    //   <p>Hello</p>
    //   <Button variant={"secondary"} onClick={fetchMovie}> Button</Button>
    // </main>
  );
}