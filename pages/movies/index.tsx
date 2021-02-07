import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../common/fetcher';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import MovieList from '../../components/MovieList';
import Movie from '../../domains/Movie';
import Title from 'antd/lib/typography/Title';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Page from '../../components/Page';
import Spin from 'antd/lib/spin';
import SearchMovie from '../../components/SearchMovie';
import MovieDetail from '../../components/MovieDetail';

const DATA_URL = 'http://www.omdbapi.com';

const getMoviesUri = ({ s = '', page = 1 }: { s: string; page: number }) =>
  `${DATA_URL}/?apikey=${process.env.API_KEY}&s=${s}&page=${page}`;

const getMovieUri = ({ i }) => `${DATA_URL}/?apikey=${process.env.API_KEY}&i=${i}`;

const Movies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [selectedMovieId, setSelectedMovieId ] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { query: { s = '' } } = router;

  const { data, error } = useSWR(
    getMoviesUri({ s: s.toString(), page: 1 }),
    fetcher
  );

  const onSearch = ({ s: newS }) => {
    router.push({
      pathname: '/movies',
      query: { s: newS },
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!s) {
      setIsLoading(false);
      return;
    }
    if (!data) {
      setMovies([]);
      setIsLoading(true);
      return;
    }
    const {
      Response: response,
      Search: search = [],
      totalResults: newTotalResults = 0,
    } = ({} = data);

    if ( response !== 'True' ) {
      message.error('Failed to load');
      return;
    }
  
    const newMovies = search.map((movieData) => new Movie(movieData));
    setMovies(newMovies);
    setTotalResults(newTotalResults);
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    (async () => {
      setIsLoading(true);
      const fetchResponse = await fetch(getMoviesUri({ s: s.toString(), page }));
      const {
        Response: response,
        Search: search = [],
        totalResults: newTotalResults = 0,
      } = await fetchResponse.json();
      
      if ( response !== 'True' ) {
        message.error('Failed to load');
        setIsLoading(false);
        return;
      }
      const newMovies = [
        ...movies,
        ...search.map((movieData) => new Movie(movieData)),
      ];
      setMovies(newMovies);
      setTotalResults(newTotalResults);
      setIsLoading(false);
    })();
  }, [page]);

  if (error) return <div>failed to load</div>;
  if (!data) return <Page style={{ display: 'flex' }}><Spin style={{margin: 'auto'}}/></Page>;

  return (
    <Page>
        <div>
        <Title>OMDB Frontend</Title>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Card>
              <SearchMovie
                initialValue={s}
                onSearch={onSearch} />
              <MovieList
                isLoading={isLoading}
                movies={movies}
                hasMore={totalResults > movies.length}
                selectedMovieId={selectedMovieId}
                loadMore={loadMore}
                setSelectedMovieId={setSelectedMovieId}
              />
            </Card>
          </Col>
          <Col span={14}>
            <Card>
              <MovieDetail
                selectedMovieId={selectedMovieId}
                getMovieUri={getMovieUri} />
            </Card>
          </Col>
        </Row>
        </div>
    </Page>
  );
};

export default Movies;
