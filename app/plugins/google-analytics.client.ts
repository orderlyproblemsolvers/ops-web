export default defineNuxtPlugin(() => {
  const { gaId } = useRuntimeConfig().public

  if (!gaId) return

  // Load the GA script
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true,
      },
    ],
  })

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', gaId)
})