'use client'
// react
import { useState, useEffect } from 'react';
import { Loader2, House, Film, Calendar, Star, Settings, Menu, Search } from 'lucide-react';

// shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback} from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';

export default function Home() {

const [movieData, setMovieData] = useState<any[]>([]);
const [error] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(true);


  const fetchMovie = async () => {
    try {
      const res = await fetch('api/FetchMovie');

      if (!res.ok) {
        throw new Error('Error in Home(): ');
      }

      const { final } = await res.json();

      setMovieData(final);
    
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

  useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Movie grid */}
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movieData.map((movie : any) => (
              <Card key={movie.id} className="overflow-hidden">
                <img src={movie.poster_path} alt={movie.title} className="w-full h-48 object-cover" />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">Year: {movie.year}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-sm font-semibold">Rating: {movie.rating}/10</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
    
    
    
    // <main>
    //   <p>Hello</p>
    //   <Button variant={"secondary"} onClick={fetchMovie}> Button</Button>
    // </main>
  );
}