import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Image from "antd/lib/image";
import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "../common/fetcher";
import Movie from "../domains/Movie";
import { Button, Skeleton, Space } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

const MovieDetail = ({ selectedMovieId, getMovieUri }: {
  selectedMovieId: string | undefined, getMovieUri: ({ i }: { i : string }) => string,
}) => {
  const { data, error } = useSWR(
    getMovieUri({ i: selectedMovieId }),
    fetcher
  );

  const movie = useMemo(() => data && new Movie(data), [data]);
  if ( !movie ) {
    return <Skeleton />
  }
  
  const { poster, title, imdbRating, year, plot, director, writer, actors, genre, runtime } = movie;
  
  const imdbRatingNumber = Number(imdbRating);

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Space direction="vertical">
          <Image 
            src={poster}
            width={100} />
          <Text type="secondary" style={{ fontSize: '11px' }}>{genre}</Text>
          <Text type="secondary" style={{ fontSize: '11px' }}>{runtime}</Text>
        </Space>
      </Col>
      <Col span={16}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={2} style={{ fontSize: '16px'}}>{title}</Title>
            <Text strong type="secondary" style={{ fontSize: '11px' }}>{year}</Text>
          </Col>
          <Col span={6}>
            <Button style={{
              borderRadius: '50%',
              padding: 0,
              width: '40px',
              height: '40px',
              marginLeft: 'auto',
              backgroundColor: imdbRatingNumber > 7 ? 'red' : imdbRatingNumber > 4 ? 'green' : 'blue',
              color: 'white',
            }}>{imdbRating}</Button>
          </Col>
        </Row>
        <Row style={{ margin: '20px 0' }}>
          <Text style={{ fontSize: '14px' }}>{plot}</Text>
        </Row>
        <Row>
          <Space direction="vertical">
            <Text><span style={{ fontWeight: 'bold' }}>DIRECTOR: </span> {director}</Text>
            <Text><span style={{ fontWeight: 'bold' }}>WRITER:</span> {writer}</Text>
            <Text><span style={{ fontWeight: 'bold' }}>ACTORS:</span> {actors}</Text>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export default MovieDetail;
