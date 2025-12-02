import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Space } from 'antd';
import { UserOutlined, IdcardOutlined, HeartOutlined } from '@ant-design/icons';

const { Option } = Select;

const PersonalFormModal = ({ 
  visible, 
  persona, 
  onSubmit, 
  onCancel, 
  loading 
}) => {
  const [form] = Form.useForm();
  const isEditing = !!persona;

  useEffect(() => {
    if (visible) {
      if (persona) {
        // Modo edición: cargar datos
        form.setFieldsValue({
          tipo_documento: persona.tipo_documento,
          documento: persona.documento,
          nombres: persona.nombres,
          apellidos: persona.apellidos,
          hobbie: persona.hobbie || ''
        });
      } else {
        // Modo creación: limpiar formulario
        form.resetFields();
      }
    }
  }, [visible, persona, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Error de validación:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>{isEditing ? 'Editar Persona' : 'Agregar Nueva Persona'}</span>
        </Space>
      }
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={isEditing ? 'Actualizar' : 'Crear'}
      cancelText="Cancelar"
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="personaForm"
        autoComplete="off"
      >
        <Form.Item
          label={
            <Space>
              <IdcardOutlined />
              <span>Tipo de Documento</span>
            </Space>
          }
          name="tipo_documento"
          rules={[
            { required: true, message: 'Por favor selecciona el tipo de documento' }
          ]}
        >
          <Select 
            placeholder="Selecciona un tipo de documento"
            size="large"
          >
            <Option value="CC">Cédula de Ciudadanía (CC)</Option>
            <Option value="CE">Cédula de Extranjería (CE)</Option>
            <Option value="TI">Tarjeta de Identidad (TI)</Option>
            <Option value="Pasaporte">Pasaporte</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <IdcardOutlined />
              <span>Número de Documento</span>
            </Space>
          }
          name="documento"
          rules={[
            { required: true, message: 'Por favor ingresa el número de documento' },
            { 
              pattern: /^[a-zA-Z0-9]+$/, 
              message: 'El documento debe contener solo letras y números (sin espacios)' 
            },
            {
              validator: (_, value) => {
                if (value && value.length < 5) {
                  return Promise.reject(new Error('El documento debe tener al menos 5 dígitos'));
                }
                if (value && value.length > 15) {
                  return Promise.reject(new Error('El documento no puede tener más de 15 dígitos'));
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input
            placeholder="Ej: 1234567890"
            size="large"
            maxLength={15}
            disabled={isEditing} // No se puede editar el documento
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <UserOutlined />
              <span>Nombres</span>
            </Space>
          }
          name="nombres"
          rules={[
            { required: true, message: 'Por favor ingresa los nombres' },
            { min: 2, message: 'Los nombres deben tener al menos 2 caracteres' },
            { max: 100, message: 'Los nombres no pueden tener más de 100 caracteres' },
            {
              pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Los nombres solo pueden contener letras y espacios'
            }
          ]}
        >
          <Input
            placeholder="Ej: Juan Carlos"
            size="large"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <UserOutlined />
              <span>Apellidos</span>
            </Space>
          }
          name="apellidos"
          rules={[
            { required: true, message: 'Por favor ingresa los apellidos' },
            { min: 2, message: 'Los apellidos deben tener al menos 2 caracteres' },
            { max: 100, message: 'Los apellidos no pueden tener más de 100 caracteres' },
            {
              pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Los apellidos solo pueden contener letras y espacios'
            }
          ]}
        >
          <Input
            placeholder="Ej: Pérez García"
            size="large"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <HeartOutlined />
              <span>Hobbie (Opcional)</span>
            </Space>
          }
          name="hobbie"
          rules={[
            { max: 200, message: 'El hobbie no puede tener más de 200 caracteres' }
          ]}
        >
          <Input.TextArea
            placeholder="Ej: Leer, programar, jugar fútbol..."
            size="large"
            rows={3}
            maxLength={200}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonalFormModal;