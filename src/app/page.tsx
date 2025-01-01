"use client";

// react
import { useState, useEffect } from "react";
import { Movie } from "@prisma/client";
// shadcn
import { ScrollArea } from "../components/ui/scroll-area";
import SearchBar from "@/components/custom/SearchBar/SearchBar";
import MovieCard from "@/components/custom/MovieCard/MovieCard";
import {
	SidebarProvider,
	Sidebar,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarComponent from "@/components/custom/Sidebar/dashboard-sidebar";

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
		<SidebarProvider>
			<div className="flex flex-row h-screen w-screen bg-blue-300">
				
				<SidebarComponent />

				<div className="flex-row overflow-hidden ">

					{/* collapse trigger and search bar */}
					<div className="flex items-center justify-between py-2">
						<div>
							<SidebarTrigger />
						</div>
						<div className="flex flex-1 justify-center">
							<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-1/3">
								<SearchBar onSearch={handleSearch} />
							</div>
						</div>
					</div>


					{/* main content */}
					<div className="flex-1 h-screen w-screen flex flex-row overflow-hidden bg-red-400">

						{/* Movie grid */}
						<ScrollArea className="flex-1 p-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
								{movieData.map((movie: Movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
							</div>
						</ScrollArea>
					</div>
				


				</div>
			</div>
		</SidebarProvider>
	);
}
