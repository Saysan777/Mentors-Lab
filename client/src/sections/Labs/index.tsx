import { Card, Col, Divider, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreateRoom, JoinRoom, LabsVideo } from './components';

const { Title, Paragraph, Text } = Typography;

type Tab = 'create' | 'join';

export const Labs = () => {
  const [tab, setTab] = React.useState<Tab>('create');

  const handleTabChange = (e: RadioChangeEvent) => {
    setTab(e.target.value);
  };

  const tabFormElement = tab === 'create' ? <CreateRoom /> : <JoinRoom />;

  return (
    <div className="labs">
      <Helmet>
        <title>Labs</title>
      </Helmet>

      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Labs.</Title>
        </Divider>
        <Paragraph type="secondary">
          Make sure you have camera properly setup before joining labs. We highly recommend you to use Chrome or Firefox
          latest edition. Disable shield if you are using Brave browser.
        </Paragraph>

        <div className="labs__container">
          <Card className="labs__card">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={14}>
                <LabsVideo />
              </Col>

              <Col span={10}>
                <Card className="labs__form my-1 py-1">
                  <Radio.Group defaultValue="create" onChange={handleTabChange} value={tab}>
                    <Radio.Button value="create">Create a new room</Radio.Button>
                    <Radio.Button value="join">Join an existing room</Radio.Button>
                  </Radio.Group>

                  <div>{tabFormElement}</div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
};
