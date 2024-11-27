'use client';

// react
import { useState, useEffect } from 'react';
import { Loader2, House, Film, Calendar, Star, Settings, Menu, Search } from 'lucide-react';

// shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { fetchMovie } from '../lib/movieApi';
import SearchBar from '@/components/custom/SearchBar/SearchBar';

export default function Home() {
  const [movieData, setMovieData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleSearch = async (query: string) => {
    try {
      const movies = await fetchMovie(query);
      setMovieData(movies);
      setError(null); // Clear any existing errors on success
    } catch (err) {
      console.error("Error in fetchMovie:", err);
      setError("Could not fetch movies at this time!");
    }
  };

  useEffect(() => {
    console.log(movieData);
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
            {movieData.map((movie: any) => (
              <Card key={movie.id} className="overflow-hidden">
                <img
                  src={movie.poster_path}
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
