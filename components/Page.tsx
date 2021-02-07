import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';

const Page: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Text style={{ color: '#fcfcfc' }}>Movies for Hitit</Text>
      </Header>
      <Content style={{
        margin: 'auto',
        padding: '20px',
        width: '100%',
        maxWidth: '720px',
      }}>
        {children}
      </Content>
    </Layout>
  );
};

export default Page;