import es from 'vuetify/lib/locale/es'
import EsValidation from 'vee-validate/dist/locale/es.json'
import OrfeoEs from './modules/orfeo/es'
import ParksEs from './modules/parks/es'
import CertificatesEs from './modules/certificates/es'
export default {
  $vuetify: es,
  validation: {
    lat_long: 'El campo {_field_} no es una latitud o longitud válida',
    any_number: 'El campo {_field_} debe contener solo caracteres numéricos',
    alpha_dots: 'El campo {_field_} solo debe contener letras y puntos',
    date_format: 'El campo {_field_} no es una fecha válda',
    greater_than_or_equal_to:
      'El campo {_field_} debe ser mayor o igual a {target}',
    greater_than: 'El campo {_field_} debe ser mayor a {target}',
    less_than_or_equal_to:
      'El campo {_field_} debe ser menor o igual a {target}',
    less_than: 'El campo {_field_} debe ser menor a {target}',
    date_equal_to: 'El campo {_field_} debe ser igual a {target}',
    date_is_between: 'El campo {_field_} debe ser estar entre {min} y {max}',
    ...EsValidation.messages,
  },
  dev: 'Ambiente de Pruebas',
  light: 'Claro',
  dark: 'Oscuro',
  system: 'Sistema',
  auto: 'Auto',
  titles: {
    Login: 'Iniciar Sesión',
    Lock: 'Bloqueado',
    Logout: 'Cerrar Sesión',
    Calendar: 'Calendario',
    Dashboard: 'Dashboard',
    Details: 'Detalles',
    Password: 'Olvidé mi Contraseña',
    PasswordReset: 'Restaurar Contraseña',
    Remember: 'Recuerde',
    Profile: 'Perfil',
    Settings: 'Confirguración',
    Orfeo: 'Orfeo',
    Historic: 'Histórico',
    Modules: 'Módulos',
    Audit: 'Auditoría',
    Roles_Perms: 'Roles y Permisos',
    NotFound: 'Esta página no existe',
    Error: 'Error',
  },
  calendar: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    '4days': '4 días',
  },
  snackTitles: {
    warning: '¡Advertencia!',
    success: '¡Bien Hecho!',
    error: '¡Error!',
    info: '¡Información!',
  },
  confirm: {
    delete: '¿Desea eliminar este registro?. Esta acción no se puede deshacer.',
  },
  addressDialog: {
    title: 'Normalizador de Direcciones',
    helpText:
      'Para añadir una dirección presiona los botones correspondientes que aparecen al inferior de este campo.',
    input: 'Dirección',
    help: 'Ayuda',
    toEnd: 'Al finalizar por favor da click en el botón superior o inferior',
    toDelete: 'Para eliminar una porción de la dirección presiona el botón',
    toDeleteAll: 'Para eliminar todo el texto presiona',
    toComplement:
      'Para añadir texto complementario a la dirección en la parte inferior podrá insertar dicho complemento.',
    frequentNom: 'Nomenclaturas Frecuentes',
    Noms: 'Nomenclaturas',
    filterNoms: 'Filtrar Nomenclaturas',
    Numbers: 'Números',
    Letters: 'Letras',
    Quadrant: 'Cuadrante',
    Complement: 'Texto complementario de la dirección',
    AddComplement: 'Añadir Complemento',
  },
  texts: {
    Error: 'Ha ocurrido un error',
    Empty: 'No hay datos',
    EmptyDesc: 'No se encontró información relacionada.',
    EmptyModules: 'No hay Módulos',
    EmptyModulesText:
      'Aún no tiene módulos asignados para acceder, por favor envíe un correo a soporte para solicitar accesos. Gracias.',
    ForgotPassword: 'Olvidé mi contraseña',
    OldLogin: 'Ir al sitio anterior',
    PasswordWarning:
      'Al cambiar su contraseña, ésta será la misma para Orfeo, Correo, SIM, Red, PC e Intranet',
    NewValues: 'Valores Nuevos',
    OldValues: 'Valores Anteriores',
  },
  inputs: {
    Audit: 'Auditoria',
    Name: 'Nombre',
    Title: 'Título',
    Role: 'Roles',
    Permission: 'Permisos',
    Username: 'Usuario',
    Password: 'Contraseña',
    PasswordConfirmation: 'Confirmar Contraseña',
    RememberMe: 'Recordarme',
    Document: 'Documento',
    Email: 'Correo electrónico',
    EmailConfirmation: 'Confirmar Correo electrónico',
    Captcha: 'Completa el captcha',
  },
  helper: {
    ContactForgotMail:
      'Correo electrónico de contácto en donde se enviará el link de restablecimiento de contraseña',
  },
  buttons: {
    go_date: 'Ir a fecha',
    Error: 'Sácame de aquí',
    List: 'Vista de Lista',
    Grid: 'Vista de Cuadrícula',
    Actions: 'Acciones',
    Cancel: 'Cancelar',
    Go: 'Ir',
    GoTo: 'Ir a',
    Excel: 'Excel',
    Close: 'Cerrar',
    Closed: 'Cerrado',
    View: 'Ver',
    Viewed: 'Visto',
    Accept: 'Aceptar',
    Accepted: 'Aceptado',
    Cancelled: 'Cancelado',
    Reset: 'Reiniciar',
    Reseted: 'Reiniciado',
    Search: 'Buscar',
    Send: 'Enviar',
    Sent: 'Enviado',
    Submit: 'Enviar',
    Submitted: 'Enviado',
    Save: 'Guardar',
    Saved: 'Guardado',
    Login: 'Iniciar Sesión',
    Logout: 'Cerrar Sesión',
    Add: 'Añadir',
    Added: 'Añadido',
    Create: 'Crear',
    Created: 'Creado',
    Edit: 'Editar',
    Edited: 'Editado',
    Delete: 'Eliminar',
    Deleted: 'Eliminado',
    Details: 'Detalles',
    Download: 'Descargar',
    Downloaded: 'Descargado',
    Restore: 'Restaurar',
    Restored: 'Restaurado',
    Reload: 'Recargar',
    Reloaded: 'Recargado',
    Refresh: 'Refrescar',
    Refreshed: 'Refrescado',
    Update: 'Actualizar',
    Updated: 'Actualizado',
    Loading: 'Cargando',
    Filter: 'Filtrar',
    Back: 'Atrás',
    More: 'Más',
    Less: 'Menos',
    Next: 'Siguiente',
    ResetFilters: 'Reiniciar Filtros',
    ViewMore: 'Ver más',
    ViewLess: 'Ver menos',
    ViewImage: 'Ver imagen',
    MoreOptions: 'Más Opcioness',
    SeeParks:'Ver Parques',
    LessOptions: 'Menos Opciones',
    AdvanceSearch: 'Búsqueda Avanzada',
    OpenInNewWindow: 'Abrir en nueva ventana',
    ViewAudit: 'Ver Historial',
    Management: 'Gestionar',
    Custom: 'Personalizado',
    History: 'Auditoría',
    Reveal: 'Revelar Acciones',
    Help: 'Ayuda',
    Upload: 'Cargar'
  },
  footer: {
    made: 'hecho con',
    web: 'para una web mejor.',
  },
  errors: {
    request: 'No hay comunicación con el servidor',
    message:
      'Algo salió mal, estamos trabajando para resolver el inconveniente.',
    online: 'Conexión a internet reestablecida',
    offline: 'No se puede verificar tu conexión a Internet',
    permissions: 'No tienes permisos para ingresar aquí.',
  },
  sidebar: {
    filters: 'Color de Acento',
    background: 'Color Barra Lateral',
    dark: 'Tema',
    language: 'Idioma',
    image: 'Imagen de Fondo',
    rtl: 'Dirección',
    images: 'Imágenes',
    install: 'Instalar SIM',
  },
  label: {
    result:
      'No se encontraron coincidencias | Se encontró una coincidencia | Se encontraron {qty} coincidencias',
    result_title: 'Buscar | 1 Resultado | {qty} Resultados',
    no_data: 'No hay datos disponibles',
    no_data_desc: 'Selecciona un parámetro para buscar',
    find_by_name: 'Buscar por nombre',
    find_by_any: 'Buscar por cualquier criterio',
    find_by: 'Buscar por',
    Comment: 'Comentario',
    comments: 'Sin comentarios | 1 comentario | {qty} comentarios',
    RateService: 'Califica este servicio',
    RateGT: 'Calificación superior a',
    Description: 'Sin descripción | Descripción',
    fields: 'Canchas Deportivas',
    stages: 'Escenarios Deportivos',
    recreation: 'Recreativos',
    others: 'Otros',
    has_office:
      'No cuenta con oficina de administración, las solicitudes de permiso se tramitan en el parque zonal o metropolitano más cercano del sector. | Cuenta con oficina de administración',
  },
  form: {
    new_values: 'Nuevos valores',
    old_values: 'Datos anteriores',
  },
  /* Import all locales from other modules */
  orfeo: { ...OrfeoEs },
  parks: { ...ParksEs },
  certificates: { ...CertificatesEs },
}
