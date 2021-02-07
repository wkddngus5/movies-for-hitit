import { useCallback } from 'react';
import List from 'antd/lib/list';
import message from 'antd/lib/message';
import Spin from 'antd/lib/spin';
import Avatar from 'antd/lib/avatar';
import Card from 'antd/lib/card';
import Movie from '../domains/Movie';
import InfiniteScroll from 'react-infinite-scroller';

const {
  Item: ListItem,
  Item: { Meta: ListItemMeta },
} = List;

const MovieList = ({ isLoading, movies, loadMore, hasMore }) => {
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
            renderItem={({ title, type, year, poster }: Movie) => (
            <ListItem>
                <ListItemMeta
                avatar={<Avatar src={poster} />}
                title={title}
                description={year}
                />
            </ListItem>
            )}
        >
            {isLoading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
            </List>
        </InfiniteScroll>
      </div>
  );
};

export default MovieList;
