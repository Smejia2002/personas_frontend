import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Tag, Tooltip } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons';

const PersonalTable = ({ 
  personas, 
  loading, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
      render: (id) => <Tag color="blue">#{id}</Tag>
    },
    {
      title: 'Tipo Documento',
      dataIndex: 'tipo_documento',
      key: 'tipo_documento',
      width: 150,
      filters: [
        { text: 'CC', value: 'CC' },
        { text: 'CE', value: 'CE' },
        { text: 'TI', value: 'TI' },
        { text: 'Pasaporte', value: 'Pasaporte' },
      ],
      onFilter: (value, record) => record.tipo_documento === value,
      render: (tipo) => {
        const colors = {
          'CC': 'green',
          'CE': 'orange',
          'TI': 'blue',
          'Pasaporte': 'purple'
        };
        return <Tag color={colors[tipo] || 'default'}>{tipo}</Tag>;
      }
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
      width: 150,
      sorter: (a, b) => a.documento - b.documento,
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      sorter: (a, b) => a.nombres.localeCompare(b.nombres),
      render: (nombres) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{nombres}</span>
        </Space>
      )
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      sorter: (a, b) => a.apellidos.localeCompare(b.apellidos),
      render: (apellidos) => <span style={{ fontWeight: 500 }}>{apellidos}</span>
    },
    {
      title: 'Hobbie',
      dataIndex: 'hobbie',
      key: 'hobbie',
      render: (hobbie) => hobbie || <Tag color="default">Sin hobbie</Tag>
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleString('es-CO', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Ver detalles">
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Editar">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>

          <Popconfirm
            title="¿Eliminar persona?"
            description={`¿Estás seguro de eliminar a ${record.nombres} ${record.apellidos}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Sí, eliminar"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Eliminar">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                loading={deletingId === record.id}
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={personas}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total: ${total} personas`,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      scroll={{ x: 1200 }}
      bordered
      size="middle"
    />
  );
};

export default PersonalTable;