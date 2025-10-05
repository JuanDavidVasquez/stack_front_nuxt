import { defineStore } from "pinia";
import type { User } from "~/interfaces/user.interface";

export const useAuthStore = defineStore("auth", () => {
  // Configuración de cookies con opciones de seguridad
  const cookieOptions = {
    maxAge: 60 * 60 * 2, // 2 horas
    sameSite: "strict" as const, // Protección CSRF
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
  };

  // Cookies para persistencia segura
  const userCookie = useCookie<User | null>("auth_user", cookieOptions);
  const authTokenCookie = useCookie<string>("auth_token", cookieOptions);
  const accessTokenCookie = useCookie<string>("access_token", {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // Access token puede durar más (30 días)
  });

  // Estado reactivo inicializado desde cookies
  const user = ref<User | null>(userCookie.value || null);
  const authToken = ref<string>(authTokenCookie.value || "");
  const accessToken = ref<string>(accessTokenCookie.value || "");

  // Sincronizar cambios con cookies automáticamente
  watch(user, (newValue) => {
    userCookie.value = newValue;
  });

  watch(authToken, (newValue) => {
    authTokenCookie.value = newValue;
  });

  watch(accessToken, (newValue) => {
    accessTokenCookie.value = newValue;
  });

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = computed((): boolean => {
    return !!user.value && !!authToken.value;
  });

  /**
   * Obtiene el usuario actual
   */
  const currentUser = computed((): User | null => {
    return user.value;
  });

  /**
   * Obtiene el token de autenticación
   */
  const getAuthToken = computed((): string => {
    return authToken.value;
  });

  /**
   * Obtiene el access token
   */
  const getAccessToken = computed((): string => {
    return accessToken.value;
  });

  /**
   * Establece los datos del usuario autenticado
   */
  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  /**
   * Establece el token de autenticación
   */
  function setAuthToken(token: string) {
    authToken.value = token;
  }

  /**
   * Establece el access token
   */
  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  /**
   * Establece todos los datos de login
   */
  function setLoginData(data: { user: User; authToken: string }) {
    user.value = data.user;
    authToken.value = data.authToken;
  }

  /**
   * Limpia todos los datos de autenticación
   */
  function clearAuth() {
    user.value = null;
    authToken.value = "";
    accessToken.value = "";
    userCookie.value = null
  }
  function $reset() {
    clearAuth();
  }

  return {
    user,
    authToken,
    accessToken,
    isAuthenticated,
    currentUser,
    getAuthToken,
    getAccessToken,
    setUser,
    setAuthToken,
    setAccessToken,
    setLoginData,
    clearAuth,
    $reset,
  };
});
