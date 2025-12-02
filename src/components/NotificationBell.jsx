import React, { useState, useEffect } from 'react';
import { Badge, Dropdown, List, Button, Empty, Typography } from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CheckOutlined
} from '@ant-design/icons';
import {
  subscribeToNotifications,
  markAsRead,
  markAllAsRead,
  clearHistory
} from '../utils/notifications';

const { Text } = Typography;

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Suscribirse a las notificaciones
    const unsubscribe = subscribeToNotifications(setNotifications);
    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    const iconStyle = { fontSize: '16px', marginRight: '8px' };
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ ...iconStyle, color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ ...iconStyle, color: '#ff4d4f' }} />;
      case 'warning':
        return <WarningOutlined style={{ ...iconStyle, color: '#faad14' }} />;
      case 'info':
        return <InfoCircleOutlined style={{ ...iconStyle, color: '#1890ff' }} />;
      default:
        return <InfoCircleOutlined style={{ ...iconStyle, color: '#1890ff' }} />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    return `Hace ${diffDays} días`;
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    markAsRead(id);
  };

  const menu = {
    items: [
      {
        key: 'header',
        label: (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Text strong style={{ fontSize: '16px' }}>Notificaciones</Text>
            {notifications.length > 0 && (
              <div>
                <Button 
                  type="link" 
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={markAllAsRead}
                >
                  Marcar todas
                </Button>
                <Button 
                  type="link" 
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={clearHistory}
                >
                  Limpiar
                </Button>
              </div>
            )}
          </div>
        ),
        disabled: true
      },
      {
        key: 'content',
        label: (
          <div style={{ maxHeight: '400px', overflowY: 'auto', width: '350px' }}>
            {notifications.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay notificaciones"
                style={{ padding: '20px 0' }}
              />
            ) : (
              <List
                dataSource={notifications}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      backgroundColor: item.read ? 'transparent' : '#f0f9ff',
                      padding: '12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      marginBottom: '4px'
                    }}
                    onClick={(e) => handleMarkAsRead(item.id, e)}
                  >
                    <List.Item.Meta
                      avatar={getIcon(item.type)}
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: '14px' }}>{item.content}</Text>
                          {!item.read && (
                            <Badge status="processing" />
                          )}
                        </div>
                      }
                      description={
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {formatTime(item.timestamp)}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        ),
        disabled: true
      }
    ]
  };

  return (
    <Dropdown
      menu={menu}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
    >
      <Badge count={unreadCount} offset={[-5, 5]}>
        <BellOutlined
          style={{
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            color: unreadCount > 0 ? '#1890ff' : 'inherit'
          }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell;