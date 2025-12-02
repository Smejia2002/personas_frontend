import React from 'react';
import { Layout as AntLayout, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import NotificationBell from './NotificationBell';

const { Header, Content } = AntLayout;
const { Title } = Typography;

const Layout = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TeamOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            Gestión de Personas
          </Title>
        </div>
        
        <NotificationBell />
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          {children}
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;