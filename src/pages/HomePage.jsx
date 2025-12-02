import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Space, Spin } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import PersonalTable from '../components/PersonalTable';
import PersonalFormModal from '../components/PersonalFormModal';
import PersonalViewModal from '../components/PersonalViewModal';
import {
  fetchPersonas,
  createPersona,
  updatePersona,
  deletePersona
} from '../redux/actions/personasActions';
import {
  showSuccess,
  showError,
  showWarning
} from '../utils/notifications';

const { Title } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const { personas, loading, error } = useSelector(state => state.personas);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar personas al montar el componente
  useEffect(() => {
    loadPersonas();
  }, []);

  // Mostrar errores cuando ocurran
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const loadPersonas = () => {
    dispatch(fetchPersonas());
  };

  // ===== CREAR PERSONA =====
  const handleCreate = () => {
    setSelectedPersona(null);
    setIsEditing(false);
    setFormModalVisible(true);
  };

  // ===== VER DETALLES =====
  const handleView = (persona) => {
    setSelectedPersona(persona);
    setViewModalVisible(true);
  };

  // ===== EDITAR PERSONA =====
  const handleEdit = (persona) => {
    setSelectedPersona(persona);
    setIsEditing(true);
    setFormModalVisible(true);
  };

  // ===== ELIMINAR PERSONA =====
  const handleDelete = async (id) => {
    const result = await dispatch(deletePersona(id));
    if (result.success) {
      showSuccess('Persona eliminada exitosamente');
    } else {
      showError('Error al eliminar la persona');
    }
  };

  // ===== SUBMIT DEL FORMULARIO =====
  const handleFormSubmit = async (values) => {
    let result;
    
    if (isEditing && selectedPersona) {
      // ACTUALIZAR
      result = await dispatch(updatePersona(selectedPersona.id, values));
      if (result.success) {
        showSuccess('Persona actualizada exitosamente');
        setFormModalVisible(false);
        setSelectedPersona(null);
      } else {
        showError(result.error || 'Error al actualizar la persona');
      }
    } else {
      // CREAR
      result = await dispatch(createPersona(values));
      if (result.success) {
        showSuccess('Persona creada exitosamente');
        setFormModalVisible(false);
      } else {
        showError(result.error || 'Error al crear la persona');
      }
    }
  };

  // ===== CERRAR MODALES =====
  const handleFormCancel = () => {
    setFormModalVisible(false);
    setSelectedPersona(null);
    setIsEditing(false);
  };

  const handleViewCancel = () => {
    setViewModalVisible(false);
    setSelectedPersona(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Title level={2} style={{ margin: 0 }}>
          Lista de Personas
        </Title>
        
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadPersonas}
            loading={loading}
          >
            Recargar
          </Button>
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
          >
            Agregar Persona
          </Button>
        </Space>
      </div>

      {/* Tabla */}
      <PersonalTable
        personas={personas}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal de Formulario (Crear/Editar) */}
      <PersonalFormModal
        visible={formModalVisible}
        persona={isEditing ? selectedPersona : null}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        loading={loading}
      />

      {/* Modal de Ver Detalles */}
      <PersonalViewModal
        visible={viewModalVisible}
        persona={selectedPersona}
        onClose={handleViewCancel}
      />
    </div>
  );
};

export default HomePage;