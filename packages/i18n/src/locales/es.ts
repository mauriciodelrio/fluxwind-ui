import type { Translations } from '../types';

/**
 * Spanish translations
 */
export const es: Translations = {
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    confirm: 'Confirmar',
    search: 'Buscar',
    filter: 'Filtrar',
    reset: 'Restablecer',
    apply: 'Aplicar',
  },
  button: {
    submit: 'Enviar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    disabled: 'Deshabilitado',
  },
  form: {
    required: 'Este campo es obligatorio',
    invalid: 'Valor inválido',
    email: 'Dirección de correo inválida',
    minLength: 'Mínimo {{min}} caracteres',
    maxLength: 'Máximo {{max}} caracteres',
  },
  validation: {
    required: '{{field}} es obligatorio',
    email: 'Por favor ingresa un correo válido',
    min: 'El valor mínimo es {{min}}',
    max: 'El valor máximo es {{max}}',
  },
  items: {
    count: {
      zero: 'Sin elementos',
      one: '1 elemento',
      other: '{{count}} elementos',
    },
  },
  aria: {
    close: 'Cerrar',
    menu: 'Menú',
    search: 'Buscar',
    loading: 'Cargando',
    navigation: 'Navegación',
  },
};
