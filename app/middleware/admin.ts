export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession()

  // If the user is not logged in, boot them back to the login page
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }
})