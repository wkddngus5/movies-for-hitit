import List from 'antd/lib/list';
import Spin from 'antd/lib/spin';
import Avatar from 'antd/lib/avatar';
import Movie from '../../domains/Movie';
import InfiniteScroll from 'react-infinite-scroller';

const {
  Item: ListItem,
  Item: { Meta: ListItemMeta },
} = List;

const MovieList = ({
  isLoading,
  movies,
  hasMore,
  selectedMovieId,
  loadMore,
  setSelectedMovieId,
}) => {
  return (
    <div style={{ height: '380px', overflow: 'auto' }}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!isLoading && hasMore}
        useWindow={false}
      >
        <List
          loading={isLoading}
          dataSource={movies}
          renderItem={({ imdbID, title, year, poster }: Movie) => (
            <ListItem
              className={`movie ${imdbID === selectedMovieId ? 'ant-btn-primary' : ''}`}
              onClick={() => setSelectedMovieId(imdbID)}>
              <ListItemMeta
                avatar={<Avatar src={poster} />}
                title={title}
                description={year}
              />
            </ListItem>
          )}
        >
          {isLoading && hasMore && <Spin />}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
