import React, { useEffect } from 'react'
import movieDB from '../api/MovieDB';
import { Cast, CreditsResponse } from '../interfaces/credistInterface';
import { MovieFull } from '../interfaces/MovieInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}
export const useMovieDetails = (movieId: number) => {
   const [movieDetails, setMovieDetails] = React.useState<MovieDetails>({
     isLoading: true,
     movieFull: undefined,
     cast: [],
   });

   const getMovieDetails = async () => {
     const movieDetailPromise = movieDB.get<MovieFull>(`/${movieId}`);
     const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

     const [ movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailPromise, castPromise]);
     setMovieDetails({
        isLoading: false,
        movieFull: movieDetailsResp.data,
        cast: castPromiseResp.data.cast,
      });
   }

   useEffect(() => {
     getMovieDetails();
   }, []);

   return{
      ...movieDetails,
   }
}


