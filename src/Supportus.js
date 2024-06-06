import React from 'react';
import { Layout, Row, Col, Card } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
        <h1>捐赠支持产品的发展</h1>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ padding: '24px 0', minHeight: '80vh' }}>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="example" src="wechatsupport.jpg" />}
              >
                <Card.Meta title="微信支付" description="扫描二维码捐赠" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="example" src="zhifubaosupport.png" />}
              >
                <Card.Meta title="支付宝" description="扫描二维码捐赠" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="example" src="./gzh.jpg" />}
              >
                <Card.Meta title="关注微信公众号" description="关注微信公众号：正经人王同学 了解最新产品进展" />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2024 Created by 微信公众号：正经人王同学
联系微信：agi_isallyouneed</Footer>
    </Layout>
  );
}

export default App;
