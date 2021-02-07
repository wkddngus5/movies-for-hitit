import Link from 'next/link';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Button from 'antd/lib/button';
import { PropsWithChildren } from 'react';

const Page: React.FC<{style?: object}> = ({ style, children }) => {
  return (
    <Layout>
      <Header>
        <Link href="/">
          <Button type="link" style={{ color: '#fcfcfc' }}>Movies for Hitit</Button>
        </Link>
      </Header>
      <Content style={{
        margin: 'auto',
        padding: '20px',
        width: '100%',
        maxWidth: '820px',
        height: 'calc(100vh - 64px)',
        ...style,
      }}>
        {children}
      </Content>
    </Layout>
  );
};

export default Page;