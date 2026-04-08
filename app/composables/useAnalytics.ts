// composables/useAnalytics.ts
export const useAnalytics = () => {
  const track = (eventName: string, params?: Record<string, any>) => {
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', eventName, params)
  }

  return { track }
}