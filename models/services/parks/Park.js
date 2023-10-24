import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

const dataModel = {
  // Datos de locacion
  code: null, // `Id_IDRD` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  name: null, // `Nombre` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  address: null, // `Direccion` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  stratum: null, // `Estrato` int DEFAULT NULL,
  locality_id: null, // `Id_Localidad` int DEFAULT NULL,
  upz_code: null, // `Upz` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  neighborhood_id: null, // `Id_Barrio` int DEFAULT NULL,
  urbanization: null, // `Urbanizacion` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  latitude: null, // `Longitud` decimal(20,15) DEFAULT NULL,
  longitude: null, // `Latitud` decimal(20,15) DEFAULT NULL,
  // Descripcion y capacidad del areas
  area_hectare: null, // `Areageo_enHa` float DEFAULT NULL,
  area: null, // `Area` double DEFAULT NULL,
  grey_area: null, // `AreaZDura` double DEFAULT NULL,
  green_area: null, // `AreaZVerde` double DEFAULT NULL,
  capacity: null, // `Aforo` float DEFAULT NULL,
  children_population: null, // `PoblacionInfantil` int DEFAULT NULL,
  youth_population: null, // `PoblacionJuvenil` int DEFAULT NULL,
  older_population: null, // `PoblacionMayor` int DEFAULT NULL,
  // Accesibilidad
  enclosure: null, // `Cerramiento` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  households: null, // `Viviendas` int DEFAULT NULL,
  walking_trails: null, // `CantidadSenderos` int DEFAULT NULL,
  walking_trails_status: null, // `EstadoSendero` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  access_roads: null, // `ViasAcceso` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  access_roads_status: null, // `EstadoVias` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  zone_type: null, // `TipoZona` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  // Detalles del parque
  scale_id: null, // `Id_Tipo` int DEFAULT NULL,
  concern: null, // `CompeteIDRD` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'No',
  visited_at: null, // `FechaVisita` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  general_status: null, // `EstadoGeneral` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  stage_type_id: null, // `Id_Tipo_Escenario` int DEFAULT NULL,
  status_id: null, // `Estado` int DEFAULT '0' Identifica si el parque tiene diagrama o no,
  // Contácto
  admin: null, // `Administracion` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  phone: null, // `TelefonoParque` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  email: null, // `Email` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  admin_name: null, // `NomAdministrador` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  vigilance: null, // `Vigilancia` enum('Con vigilancia','Sin vigilancia') CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  received: null, // `RecibidoIdrd` enum('Si','No') CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  vocation_id: null, // `Id_Vocacion` int DEFAULT NULL,
  // Archivos
  image: null, // `Imagen` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  concept_id: null, // `EstadoCertificado` int DEFAULT NULL,
  certificate: null, // `UbicacionCertificado` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  features:[],
}

export class Park extends Model {
  constructor(data = dataModel) {
    super(Api.END_POINTS.PARKS(), data)
  }

  excel(options = {}) {
    return this.get(Api.END_POINTS.EXCEL(), options)
  }

  sectors(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_SECTORS(id), options)
  }

  furnishings(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_FURNITURE(id), options)
  }

  social(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_SOCIAL_PROGRAMS(id), options)
  }

  activities(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_ACTIVITIES(id), options)
  }

  events(options = {}) {
    return this.get(Api.END_POINTS.PARKS_ACTIVITIES_SPORTS(), options)
  }

  economic(id, options = {}) {
    return this.get(Api.END_POINTS.PARKS_ECONOMIC(id), options)
  }

  diagrams(options = {}) {
    return this.get(Api.END_POINTS.DIAGRAMS(), options)
  }

  equipment(parkId, equipmentId, options = {}) {
    return this.get(
      Api.END_POINTS.PARKS_EQUIPMENT(parkId, equipmentId),
      options
    )
  }

  esri(options = {}) {
    return this.get(Api.END_POINTS.PARKS_ESRI_CONFIG(), options)
  }
}
