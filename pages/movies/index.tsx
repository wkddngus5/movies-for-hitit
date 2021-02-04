import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import fetcher from '../../common/fetcher';

const Movies = () => {
    const router = useRouter();

    const { data, error } = useSWR(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${router.query.t}`, fetcher);
    const [movies, setMovies] = useState(); 

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    return (<div>Movies</div>)
}

export default Movies;
