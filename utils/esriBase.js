const esriConfig = {
  iframe: {
    url: 'https://mapas.bogota.gov.co/?l=436&e=-74.57201001759988,4.2906625340901,-73.61070630666201,4.928542831147915,4686&show_menu=false',
    dark: '&b=7176',
    light: '&b=262',
    filter: '&layerFilter=436;',
  },
  layer: {
    url: 'https://services3.arcgis.com/PbFl1d5DOILtEZmY/ArcGIS/rest/services/sdp_idrd/FeatureServer/0',
    outFields: [
      'OBJECTID_1',
      'OBJECTID',
      'Id_Parque',
      'Estrato',
      'Coordenada',
      'Coordena_1',
      'Nombre_Par',
      'CodigoPot',
      'LocNombre',
      'Administra',
      'Estado_Cer',
      'Id_Localid',
      'RuleID',
      'FechaIncor',
      'Shape_Leng',
      'Tipologia',
      'Nivel',
      'Actuacion',
      'Id_UPL',
      'CODIGO_UPZ',
      'NOMBRE',
      'ACTO_ADMIN',
      'CODIGO_UPR',
      'NOMBRE_1',
      'ACTO_ADM_1',
      'Id_UPZ',
      'TipoParque',
      'Shape_Le_1',
      'Shape_Area',
    ],
    popupTemplate: {
      title: '{Id_Parque} - {Nombre_Par}',
      lastEditInfoEnabled: true,
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'Nombre_Par',
              label: 'Nombre Parque',
            },
            {
              fieldName: 'TipoParque',
              label: 'Tipo de Parque',
            },
            {
              fieldName: 'Estrato',
              label: 'Estrato',
            },
            {
              fieldName: 'CodigoPot',
              label: 'POT',
            },
            {
              fieldName: 'LocNombre',
              label: 'Localidad',
            },
            {
              fieldName: 'CODIGO_UPZ',
              label: 'Código UPZ',
            },
            {
              fieldName: 'NOMBRE',
              label: 'Nombre UPZ',
            },
            {
              fieldName: 'Administra',
              label: 'Administra',
            },
            {
              fieldName: 'Estado_Cer',
              label: 'Estado Certificado',
            },
            {
              fieldName: 'FechaIncor',
              label: 'Fecha de Incorporación',
            },
            {
              fieldName: 'Tipologia',
              label: 'Tipología',
            },
            {
              fieldName: 'Nivel',
              label: 'Nivel',
            },
            {
              fieldName: 'Actuacion',
              label: 'Actuación',
            },
            {
              fieldName: 'Id_UPL',
              label: 'UPL',
            },
            {
              fieldName: 'ACTO_ADMIN',
              label: 'Acto Admin',
            },
            {
              fieldName: 'CODIGO_UPR',
              label: 'Código UPR',
            },
          ],
        },
      ],
    },
  },
  param: 'Id_Parque=',
  park_types: [
    {
      name: 'TODO',
      value: 'todo',
      style: {
        backgroundColor: 'rgba(89,77,149, 1)',
        borderColor: 'rgba(89,77,149, 1)',
      },
    },
    {
      name: 'PARQUE REGIONAL',
      value: "TipoParque='PARQUE REGIONAL'",
      style: {
        backgroundColor: 'rgba(56, 168, 0, 1)',
        borderColor: 'rgba(56, 168, 0, 1)',
      },
    },
    {
      name: 'PARQUE METROPOLITANO',
      value: "TipoParque='PARQUE METROPOLITANO'",
      style: {
        backgroundColor: 'rgba(112, 168, 0, 1)',
        borderColor: 'rgba(112, 168, 0, 1)',
      },
    },
    {
      name: 'PARQUE ZONAL',
      value: "TipoParque='PARQUE ZONAL'",
      style: {
        backgroundColor: 'rgba(170, 255, 0, 1)',
        borderColor: 'rgba(170, 255, 0, 1)',
      },
    },
    {
      name: 'ESCENARIO DEPORTIVO',
      value: "TipoParque='ESCENARIO DEPORTIVO'",
      style: {
        backgroundColor: 'rgba(230, 152, 0, 1)',
        borderColor: 'rgba(230, 152, 0, 1)',
      },
    },
    {
      name: 'PARQUE VECINAL',
      value: "TipoParque='PARQUE VECINAL'",
      style: {
        backgroundColor: 'rgba(209, 255, 115, 1)',
        borderColor: 'rgba(209, 255, 115, 1)',
      },
    },
    {
      name: 'PARQUE DE BOLSILLO',
      value: "TipoParque='PARQUE DE BOLSILLO'",
      style: {
        backgroundColor: 'rgba(233, 255, 190, 1)',
        borderColor: 'rgba(233, 255, 190, 1)',
      },
    },
    {
      name: 'ADMINISTRA IDRD',
      value: "Administra='IDRD'",
      style: {
        backgroundColor: 'rgb(255,190,200)',
        borderColor: 'rgba(255,190,200)',
      },
    },
  ],
}

export default esriConfig
