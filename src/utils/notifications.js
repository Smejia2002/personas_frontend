import { message } from 'antd';

// Configuración global de los mensajes
message.config({
  top: 80,
  duration: 3,
  maxCount: 3,
});

// Almacenamiento de notificaciones (para el historial de la campanita)
let notificationHistory = [];
let notificationListeners = [];

// Función para agregar al historial
const addToHistory = (type, content) => {
  const notification = {
    id: Date.now(),
    type,
    content,
    timestamp: new Date(),
    read: false
  };
  
  notificationHistory = [notification, ...notificationHistory];
  
  // Notificar a todos los listeners (la campanita)
  notificationListeners.forEach(listener => listener(notificationHistory));
  
  // Limitar a 50 notificaciones
  if (notificationHistory.length > 50) {
    notificationHistory = notificationHistory.slice(0, 50);
  }
};

// Funciones de notificación con toast + historial
export const showSuccess = (content) => {
  message.success(content);
  addToHistory('success', content);
};

export const showError = (content) => {
  message.error(content);
  addToHistory('error', content);
};

export const showWarning = (content) => {
  message.warning(content);
  addToHistory('warning', content);
};

export const showInfo = (content) => {
  message.info(content);
  addToHistory('info', content);
};

// Funciones para manejar el historial
export const getNotificationHistory = () => notificationHistory;

export const subscribeToNotifications = (callback) => {
  notificationListeners.push(callback);
  // Retornar función para desuscribirse
  return () => {
    notificationListeners = notificationListeners.filter(l => l !== callback);
  };
};

export const markAsRead = (id) => {
  notificationHistory = notificationHistory.map(n =>
    n.id === id ? { ...n, read: true } : n
  );
  notificationListeners.forEach(listener => listener(notificationHistory));
};

export const markAllAsRead = () => {
  notificationHistory = notificationHistory.map(n => ({ ...n, read: true }));
  notificationListeners.forEach(listener => listener(notificationHistory));
};

export const clearHistory = () => {
  notificationHistory = [];
  notificationListeners.forEach(listener => listener(notificationHistory));
};