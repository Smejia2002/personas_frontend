import api from '../../services/api';
import {
  FETCH_PERSONAS_REQUEST, FETCH_PERSONAS_SUCCESS, FETCH_PERSONAS_FAILURE,
  FETCH_PERSONA_REQUEST, FETCH_PERSONA_SUCCESS, FETCH_PERSONA_FAILURE,
  CREATE_PERSONA_REQUEST, CREATE_PERSONA_SUCCESS, CREATE_PERSONA_FAILURE,
  UPDATE_PERSONA_REQUEST, UPDATE_PERSONA_SUCCESS, UPDATE_PERSONA_FAILURE,
  DELETE_PERSONA_REQUEST, DELETE_PERSONA_SUCCESS, DELETE_PERSONA_FAILURE,
  CLEAR_ERRORS
} from '../reducers/personasReducer';

export const fetchPersonas = () => async (dispatch) => {
  dispatch({ type: FETCH_PERSONAS_REQUEST });
  try {
    const response = await api.get('/personas');
    dispatch({ type: FETCH_PERSONAS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_PERSONAS_FAILURE,
      payload: error.response?.data?.message || 'Error al cargar personas'
    });
  }
};

export const fetchPersonaById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PERSONA_REQUEST });
  try {
    const response = await api.get(`/personas/${id}`);
    dispatch({ type: FETCH_PERSONA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_PERSONA_FAILURE,
      payload: error.response?.data?.message || 'Error al cargar persona'
    });
  }
};

export const createPersona = (personaData) => async (dispatch) => {
  dispatch({ type: CREATE_PERSONA_REQUEST });
  try {
    const response = await api.post('/personas', personaData);
    // Backend devuelve { success, message, data }
    dispatch({ type: CREATE_PERSONA_SUCCESS, payload: response.data.data });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Error al crear persona';
    dispatch({ type: CREATE_PERSONA_FAILURE, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};

export const updatePersona = (id, personaData) => async (dispatch) => {
  dispatch({ type: UPDATE_PERSONA_REQUEST });
  try {
    const response = await api.put(`/personas/${id}`, personaData);
    // Backend devuelve { success, message, data }
    dispatch({ type: UPDATE_PERSONA_SUCCESS, payload: response.data.data });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Error al actualizar persona';
    dispatch({ type: UPDATE_PERSONA_FAILURE, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};

export const deletePersona = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PERSONA_REQUEST });
  try {
    const response = await api.delete(`/personas/${id}`);
    dispatch({ type: DELETE_PERSONA_SUCCESS, payload: id });
    return { success: true, message: response.data.message };
  } catch (error) {
    dispatch({
      type: DELETE_PERSONA_FAILURE,
      payload: error.response?.data?.message || 'Error al eliminar persona'
    });
    return { success: false, error: error.response?.data?.message };
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });