import es from './lang/es'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es',
  messages: {
    es: es,
  },
}))
