export default {
  application: 'Stack Front',
  loading: 'Cargando, por favor espere...',
  rol: {
    admin: 'Administrador',
    ops: 'Operador',
  },
  title: {
    welcome: 'Bienvenido',
    login: 'Iniciar sesión',
    forgotPassword: 'Recuperar contraseña',
    validateCode: 'Recuperar contraseña',
    changePassword: 'Restablecer contraseña',
    logout: 'Cerrar sesión',
  },
  form: {
    role: {
      label: 'Rol',
      placeholder: 'Selecciona',
    },
    fullname: {
      label: 'Nombre',
      placeholder: 'Escriba su nombre',
    },
    email: {
      label: 'Email',
      placeholder: 'Escribir correo electrónico',
    },
    password: {
      label: 'Contraseña',
      placeholder: 'Escribir contraseña',
      tooltip:
        'La contraseña debe contener al menos una minúscula, una mayúscula y un número',
      rules:{
        min: 'La contraseña debe tener al menos 6 caracteres',
        max: 'La contraseña no debe exceder los 50 caracteres',
        valid: 'Mín. 8 caracteres alfanuméricos: 1 mayúscula, 1 minúscula',
        confirm: 'Las contraseñas deben coincidir',
        obligatory: 'La contraseña es obligatoria',
        email: 'El email es obligatorio',
        invalid: 'El email debe ser válido',
      }
    },
    passwordNew: {
      label: 'Nueva contraseña',
    },
    confirmPassword: {
      label: 'Repetir nueva contraseña',
      placeholder: 'Repetir Contraseña',
    },
  },
  button: {
    login: 'Iniciar sesión',
    forgotPassword: 'Recuperar contraseña',
    sendCode: 'Enviar código',
    resendCode: 'Reenviar',
    validate: 'Verificar',
    reset: 'Restablecer',
    update: 'Actualizar',
    cancel: 'Cancelar',
    create: 'Crear',
    no: 'No',
    logout: 'Sí, salir',
    confirm: 'Confirmar',
    finished: 'Finalizar',
    actions: {
      created: {
        admin: 'Nuevo administrador',
      },
    },
  },
  rule: {
    form: 'Por favor revisa la información',
    image: 'Debe seleccionar una imagen',
    validation: {
      require: 'El dato es requerido para continuar',
      value: {
        min: 'Debe ser mayor o igual a {data}',
        max: 'Debe ser inferior o igual a {data}',
      },
      length: {
        min: 'Debe contener al menos {data} carácteres',
        max: 'No puede contener más de {data} carácteres',
      },
      email: 'Debe ser una dirección de correo válida',
      password: {
        valid: 'Mín. 8 caracteres alfanuméricos: 1 mayúscula, 1 minúscula',
        confirm: 'Las contraseñas deben coincidir',
      },
      number: 'El dato es solo numérico',
    },
  },
  store: {
    apiServices: {
      sessionExpired:
        'Su sesión ha expirado, por favor inicie sesión nuevamente',
      loginRequired: 'Debe ingresar sus credenciales para continuar',
      timeOut:
        'Ha tardado demasiado en responder. Intente nuevamente más tarde',
      notFound:
        'No se encontró la url solicitada. Intente nuevamente más tarde',
      generalError:
        'Ocurrió un error en el servidor. Intente nuevamente más tarde',
    },
  },
  text: {
    login: 'Por favor digita tu correo electrónico',
    forgotPassword:
      'Ingresa tu correo electrónico, te enviaremos un código para poder restablecer tu contraseña.',
    validateCode: 'Ingresa el código que enviamos a tu correo electrónico: ',
    changePassword:
      'La contraseña debe contener 8 caracteres alfanuméricos, una mayúscula y una minúscula.',
    logout: '¿Seguro que desea cerrar sesión?',
    code: '¿Aún no recibes el código?',
    return: 'Volver',
    admins: {
      create: {
        title: 'Crear admin',
      },
      edit: {
        title: 'Editar admin',
      },
    },
  },
  table: {
    empty: {
      title: 'Lo sentimos',
      message: 'Lamentablemente no tenemos datos que mostrar.',
    },
    loading: 'Cargando... Por favor aguarde un momento',
    state: {
      title: 'Estado',
      active: 'Activo',
      inactive: 'Inactivo',
    },
    admin: {
      name: 'Nombre y correo',
      role: 'Rol',
    },
    enums: {
      role: {
        administrative: 'Administrativo',
        superadmin: 'Super Administrador',
        operative: 'Operativo',
      },
    },
    filters: {
      all: 'Todos',
      search: 'Buscar',
      role: 'Rol',
      status: 'Estado',
    },
  },
  menu: {
    logout: 'Cerrar sesión',
    country: 'Países',
    dashboard: 'Dashboard',
    admin: 'Administradores',
    driver: 'Conductores',
    customer: 'Usuarios',
    services: 'Servicios',
    payments: 'Pagos',
    vehicles: 'Vehículos',
    rates: 'Tarifas',
    notification: 'Notificaciones',
    coupons: 'Cupones',
    notFound: '404 - Página no encontrada',
  },
  login: {
    invalidCredentials: 'Credenciales inválidas, por favor intente nuevamente',
    accountInactive: 'Su cuenta está inactiva, por favor contacte al administrador',
    success: '¡Inicio de sesión exitoso! Redirigiendo...',
    subtitle: 'Ingresa tu correo y contraseña para iniciar',
    forgotPassword: '¿Olvidaste tu contraseña?',
    new: '¿No tienes una cuenta?',
    register: 'Regístrate',
    login: 'Ingresar',
    loading: 'Ingresando...',
  },
  sideBar: {
    menu: 'Menú',
    close: 'Cerrar',
    home: 'Inicio',
    admin: 'Administración',
    logout: 'Cerrar Sesión',
    footer: {
      copyright: '© 2025 Mi Aplicación'
    }
  }
}
