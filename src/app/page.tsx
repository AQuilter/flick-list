'use client';

// react
import { useState, useEffect } from 'react';
import {PrismaClient, Movie} from '@prisma/client';
// shadcn
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import SearchBar from '@/components/custom/SearchBar/SearchBar';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [movieData, setMovieData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  
  const handleSearch = async (searchTerm: string) => {
    try {
      // setSearchTerm(searchTerm);
      const res = await fetch(`api/movies/search?query=${searchTerm}`);
      
      if (!res.ok) {
        console.log("Response not !ok");
      }

      const data = await res.json();

      setMovieData(data.final);

    } catch (error) {
      console.log("Error from handleSearch():", error);
    }
  };

  useEffect(() => {
    console.log("useEffect movie data: ", movieData);
  }, [movieData]);

  return (
    <div>
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SearchBar onSearch={handleSearch} />

        {/* Movie grid */}
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movieData.map((movie: Movie) => (
              <Card key={movie.id} className="overflow-hidden">
                <img
                  src={movie.poster_path || undefined} 
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Year: {movie.release_date?.split('-')[0] || 'N/A'}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-sm font-semibold">Rating: {movie.vote_average || 'N/A'}/10</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
