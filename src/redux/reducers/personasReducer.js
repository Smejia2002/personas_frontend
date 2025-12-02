const initialState = {
  personas: [],
  personaActual: null,
  loading: false,
  error: null,
};

export const FETCH_PERSONAS_REQUEST = 'FETCH_PERSONAS_REQUEST';
export const FETCH_PERSONAS_SUCCESS = 'FETCH_PERSONAS_SUCCESS';
export const FETCH_PERSONAS_FAILURE = 'FETCH_PERSONAS_FAILURE';

export const FETCH_PERSONA_REQUEST = 'FETCH_PERSONA_REQUEST';
export const FETCH_PERSONA_SUCCESS = 'FETCH_PERSONA_SUCCESS';
export const FETCH_PERSONA_FAILURE = 'FETCH_PERSONA_FAILURE';

export const CREATE_PERSONA_REQUEST = 'CREATE_PERSONA_REQUEST';
export const CREATE_PERSONA_SUCCESS = 'CREATE_PERSONA_SUCCESS';
export const CREATE_PERSONA_FAILURE = 'CREATE_PERSONA_FAILURE';

export const UPDATE_PERSONA_REQUEST = 'UPDATE_PERSONA_REQUEST';
export const UPDATE_PERSONA_SUCCESS = 'UPDATE_PERSONA_SUCCESS';
export const UPDATE_PERSONA_FAILURE = 'UPDATE_PERSONA_FAILURE';

export const DELETE_PERSONA_REQUEST = 'DELETE_PERSONA_REQUEST';
export const DELETE_PERSONA_SUCCESS = 'DELETE_PERSONA_SUCCESS';
export const DELETE_PERSONA_FAILURE = 'DELETE_PERSONA_FAILURE';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export default function personasReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PERSONAS_REQUEST:
    case FETCH_PERSONA_REQUEST:
    case CREATE_PERSONA_REQUEST:
    case UPDATE_PERSONA_REQUEST:
    case DELETE_PERSONA_REQUEST:
      return { ...state, loading: true, error: null };
      
    case FETCH_PERSONAS_SUCCESS:
      return { ...state, loading: false, personas: action.payload };
      
    case FETCH_PERSONA_SUCCESS:
      return { ...state, loading: false, personaActual: action.payload };
      
    case CREATE_PERSONA_SUCCESS:
      return {
        ...state,
        loading: false,
        personas: [...state.personas, action.payload]
      };
      
    case UPDATE_PERSONA_SUCCESS:
      return {
        ...state,
        loading: false,
        personas: state.personas.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
        personaActual: null
      };
      
    case DELETE_PERSONA_SUCCESS:
      return {
        ...state,
        loading: false,
        personas: state.personas.filter(p => p.id !== action.payload)
      };
      
    case FETCH_PERSONAS_FAILURE:
    case FETCH_PERSONA_FAILURE:
    case CREATE_PERSONA_FAILURE:
    case UPDATE_PERSONA_FAILURE:
    case DELETE_PERSONA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
}