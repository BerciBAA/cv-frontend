import { AppTheme } from './app-theme.model';

export const STYLES: Record<'light' | 'dark', AppTheme> = {
  light: {
    header: {
      bg: 'bg-gray-100',
      bgHover: '',
      text: '!text-black',
      textHover: '',
    },
    headerButton: {},
    body: {
      bg: 'bg-gray-100',
      text: '!text-black',
    },
    button: {
      bg: 'bg-indigo-600',
      bgHover: 'hover:bg-indigo-500',
      text: '!text-white',
      textHover: '!text-white',
    },
    card: {
      bg: 'bg-gray-300',
      bgHover: 'hover:bg-gray-400',
      text: '!text-black',
      textHover: '!hover:text-black',
    },
    componentSelector: {
      bg: 'bg-gray-200',
      bgHover: '',
      text: '!text-black',
      textHover: '',
      border: '',
    },
    closeButton: {
      bg: 'bg-gray-300',
      bgHover: 'hover:bg-gray-400',
      text: '!text-black',
      textHover: '!hover:text-black',
      border: '',
    },
    editor: {
      bg: 'bg-white',
      bgHover: '',
      text: '!text-black',
      textHover: '',
      border: '',
    },
    input: {
      bg: 'bg-white',
      text: 'text-black placeholder-gray-500',
      border:
        'border border-gray-400 focus:border-black focus:ring-1 focus:ring-black',
    },
    label: {
      text: 'text-black',
      textHover: 'peer-focus:text-black',
    },
    skillCard: {
      bg: 'bg-gray-100',
      text: '!text-black',
    },
  },

  dark: {
    header: {
      bg: 'bg-gray-600',
      bgHover: '',
      text: '!text-white',
      textHover: '',
    },
    headerButton: {},
    body: {
      bg: 'bg-gray-500',
      text: '!text-white',
    },
    button: {
      bg: 'bg-gray-800',
      bgHover: 'hover:bg-gray-900',
      text: '!text-gray-100',
      textHover: '!text-white',
    },
    card: {
      bg: 'bg-gray-800',
      bgHover: 'hover:bg-gray-900',
      text: '!text-white',
      textHover: '!hover:text-black',
    },
    componentSelector: {
      bg: 'bg-gray-600',
      bgHover: '',
      text: '!text-white',
      textHover: '',
      border: '',
    },
    closeButton: {
      bg: 'bg-gray-800',
      bgHover: 'hover:bg-gray-900',
      text: '!text-white',
      textHover: '!hover:text-black',
      border: '',
    },
    editor: {
      bg: 'bg-gray-800',
      bgHover: '',
      text: '!text-white',
      textHover: '',
      border: '',
    },
    input: {
      bg: 'bg-gray-800',
      text: 'text-white placeholder-gray-400',
      border:
        'border border-gray-600 focus:border-white focus:ring-1 focus:ring-white',
    },
    label: {
      text: 'text-white',
      textHover: 'peer-focus:text-white',
    },
    skillCard: {
      bg: 'bg-gray-700',
      text: '!text-white',
    },
  },
};
