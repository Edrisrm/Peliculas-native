import React, { useEffect, useState } from 'react'
import movieDB from '../api/MovieDB'
import { Movie, MovieDBMoviesResponse } from '../interfaces/MovieInterface'


interface MoviesState {
    nowPlaying: Movie[],
    popular: Movie[],
    topRated: Movie[],
    upcoming: Movie[],
}
export const useMovies = () => {
   const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

    const getMovies = async () => {
        const  nowPlatingPromise= movieDB.get<MovieDBMoviesResponse>('/now_playing')
        const  popularPromise= movieDB.get<MovieDBMoviesResponse>('/popular') 
        const  topRatedPromise= movieDB.get<MovieDBMoviesResponse>('/top_rated') 
        const  upcomingPromise= movieDB.get<MovieDBMoviesResponse>('/upcoming') 

        const resposne = await Promise.all([
            nowPlatingPromise, 
            popularPromise, 
            topRatedPromise, 
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: resposne[0].data.results,
            popular: resposne[1].data.results,
            topRated: resposne[2].data.results,
            upcoming: resposne[3].data.results,
        });

        setIsLoading(false);
    }

    useEffect(() => {
        //now_playing
        getMovies();
    }, [])

    return{
        ...moviesState,
        isLoading
    }
}
