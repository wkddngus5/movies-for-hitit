import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../common/fetcher';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import MovieList from '../../components/MovieList';
import Movie from '../../domains/Movie';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Page from '../../components/Page';
import Spin from 'antd/lib/spin';

const DATA_URL = 'http://www.omdbapi.com';

const getMoviesUri = ({ s = '', page = 1 }: { s: string; page: number }) =>
  `${DATA_URL}/?apikey=${process.env.API_KEY}&s=${s}&page=${page}`;

const Movies = () => {
  const router = useRouter();
  const [form] = useForm();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    query: { s = '' },
  } = router;
  const { data, error } = useSWR(
    getMoviesUri({ s: s.toString(), page: 1 }),
    fetcher
  );

  const onSubmit = () => {
    const { s: newS = '' } = form.getFieldsValue();
    router.push({
      pathname: '/movies',
      query: { s: newS },
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
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
  if (!data) return <Page><Spin /></Page>;

  return (
    <Page>
        <div>
        <Title>OMDB Frontend</Title>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Card>
              <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{ s }}>
                <FormItem
                  label="Search"
                  name="s"
                  colon={false}
                  rules={[
                    { required: true, message: 'Please input to search!' },
                  ]}
                >
                  <Input />
                </FormItem>
              </Form>
              <MovieList
                isLoading={isLoading}
                movies={movies}
                hasMore={totalResults > movies.length}
                loadMore={loadMore}
              />
            </Card>
          </Col>
          <Col span={14}></Col>
        </Row>
        </div>
    </Page>
  );
};

export default Movies;
