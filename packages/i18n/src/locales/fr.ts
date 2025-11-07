import type { Translations } from '../types';

/**
 * French translations
 */
export const fr: Translations = {
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    close: 'Fermer',
    confirm: 'Confirmer',
    search: 'Rechercher',
    filter: 'Filtrer',
    reset: 'Réinitialiser',
    apply: 'Appliquer',
  },
  button: {
    submit: 'Soumettre',
    cancel: 'Annuler',
    loading: 'Chargement...',
    disabled: 'Désactivé',
  },
  form: {
    required: 'Ce champ est obligatoire',
    invalid: 'Valeur invalide',
    email: 'Adresse e-mail invalide',
    minLength: 'Minimum {{min}} caractères',
    maxLength: 'Maximum {{max}} caractères',
  },
  validation: {
    required: '{{field}} est obligatoire',
    email: 'Veuillez saisir un e-mail valide',
    min: 'La valeur minimale est {{min}}',
    max: 'La valeur maximale est {{max}}',
  },
  items: {
    count: {
      zero: 'Aucun élément',
      one: '1 élément',
      other: '{{count}} éléments',
    },
  },
  aria: {
    close: 'Fermer',
    menu: 'Menu',
    search: 'Rechercher',
    loading: 'Chargement',
    navigation: 'Navigation',
  },
};
