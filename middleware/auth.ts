export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/login');
  }
});