<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">¡Bienvenido!</h1>
        <p class="login-subtitle">Ingresa tu correo y contraseña para iniciar</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Mostrar error si existe -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="correo@ejemplo.com"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••"
              required
              :disabled="isLoading"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
              :disabled="isLoading"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="form-footer">
          <NuxtLink to="/password-recovery" class="forgot-password">
            ¿Olvidaste tu contraseña?
          </NuxtLink>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>

      <div class="login-extra">
        <p>¿No tienes cuenta? <NuxtLink to="/register" class="link-register">Regístrate</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginForm } from '~/interfaces/login.interface'

// Usar el composable de autenticación
const { login, isAuthenticated } = useAuth()
const router = useRouter()

// Estado del formulario
const formData = reactive<LoginForm>({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

// Redirigir si ya está autenticado
onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/index')
  }
})

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await login(formData)
    
    // Si el login falló, mostrar el mensaje de error
    if (!result.status) {
      error.value = result.message
    }
    
    
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = 'Ocurrió un error inesperado. Intenta nuevamente.'
  } finally {
    isLoading.value = false
  }
}
</script>
