// models
import { Movie } from ".prisma/client";

// shadcn
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface MovieCardArgs {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardArgs) {
  return (
    <>
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
          <p className="text-sm text-muted-foreground">
            Year: {movie.release_date?.split("-")[0] || "N/A"}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm font-semibold">
            Rating: {movie.vote_average || "N/A"}/10
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
