import React from 'react';
import { Modal, Descriptions, Tag, Space, Divider } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  HeartOutlined
} from '@ant-design/icons';

const PersonalViewModal = ({ visible, persona, onClose }) => {
  if (!persona) return null;

  const getTipoDocumentoColor = (tipo) => {
    const colors = {
      'CC': 'green',
      'CE': 'orange',
      'TI': 'blue',
      'Pasaporte': 'purple'
    };
    return colors[tipo] || 'default';
  };

  return (
    <Modal
      title={
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>Detalles de la Persona</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item 
          label={
            <Space>
              <IdcardOutlined />
              <span>ID</span>
            </Space>
          }
        >
          <Tag color="blue" style={{ fontSize: '14px' }}>
            #{persona.id}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <IdcardOutlined />
              <span>Tipo de Documento</span>
            </Space>
          }
        >
          <Tag color={getTipoDocumentoColor(persona.tipo_documento)} style={{ fontSize: '14px' }}>
            {persona.tipo_documento}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <IdcardOutlined />
              <span>Número de Documento</span>
            </Space>
          }
        >
          <span style={{ fontSize: '16px', fontWeight: 500 }}>
            {persona.documento}
          </span>
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <UserOutlined />
              <span>Nombres</span>
            </Space>
          }
        >
          <span style={{ fontSize: '16px', fontWeight: 500 }}>
            {persona.nombres}
          </span>
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <UserOutlined />
              <span>Apellidos</span>
            </Space>
          }
        >
          <span style={{ fontSize: '16px', fontWeight: 500 }}>
            {persona.apellidos}
          </span>
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <HeartOutlined />
              <span>Hobbie</span>
            </Space>
          }
        >
          {persona.hobbie ? (
            <span style={{ fontSize: '14px' }}>{persona.hobbie}</span>
          ) : (
            <Tag color="default">Sin hobbie registrado</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item 
          label={
            <Space>
              <CalendarOutlined />
              <span>Fecha de Creación</span>
            </Space>
          }
        >
          {persona.created_at ? (
            <span style={{ fontSize: '14px' }}>
              {new Date(persona.created_at).toLocaleString('es-CO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          ) : (
            '-'
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Modal>
  );
};

export default PersonalViewModal;