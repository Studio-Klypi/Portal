export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUser();

  if (!user.value) {
    if (to.path.includes("/auth/login"))
      return;
    return navigateTo("/auth/login");
  }

  if (to.path.includes("/auth/login")) {
    if (from)
      return navigateTo("/");
    return abortNavigation();
  }
});
