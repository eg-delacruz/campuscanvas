import LogisticsImage from '../assets/static/logistics_image.jpg';

export const JOBS = [
  {
    /////////////////////////
    //       Job1          //
    /////////////////////////
    id: 1,
    JobTitle: 'Desarrollador frontend con React',
    CardDescription:
      'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    SpecificationList1: [
      {
        Location: 'Ciudad Universitaria',
        PublishingDate: '26/10/2021',
        Salary: '25 000 EUR',
      },
    ],
    SpecificationList2: [
      {
        Experience: '2 años',
        Contract: 'Temporal',
      },
    ],
    RequirementsList: [
      {
        MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
        Experience: '2 Años',
        Availability: '8 horas diarias',
      },
    ],
    Image: LogisticsImage,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
    //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
    TasksList: {
      Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
      Task2:
        'Apoyo en la recolección de bienes para su posterior distribución.',
      Task3:
        'Conducción de furgoneta para recogida y posterior distribución de materiales.',
      Task4: 'Preparación de bolsas de repartición en almacén.',
      Task5: 'Promoción de servicios',
      Task6: 'Orientación de estudiantes en puntos de repartición.',
    },
    //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
    YourBenefitsList: {
      Benefit1:
        'Ambiente agradable en una empresa joven y de rápido crecimiento.',
      Benefit2:
        'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
      Benefit3:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit4:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit5:
        'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit6:
        'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
    },
    //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
    ProfileList: {
      Attribute1: 'Edad: 18 - 50 años',
      Attribute2: 'Conocimientos en word, excel, PowerPoint.',
      Attribute3:
        'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
    },
  },

  /////////////////////////
  //       Job2          //
  /////////////////////////

  {
    id: 2,
    JobTitle: 'Desarrollador frontend con React',
    CardDescription:
      'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    SpecificationList1: [
      {
        Location: 'Ciudad Universitaria',
        PublishingDate: '26/10/2021',
        Salary: '25 000 EUR',
      },
    ],
    SpecificationList2: [
      {
        Experience: '2 años',
        Contract: 'Temporal',
      },
    ],
    RequirementsList: [
      {
        MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
        Experience: '2 Años',
        Availability: '8 horas diarias',
      },
    ],
    Image: LogisticsImage,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
    //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
    TasksList: {
      Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
      Task2:
        'Apoyo en la recolección de bienes para su posterior distribución.',
      Task3:
        'Conducción de furgoneta para recogida y posterior distribución de materiales.',
      Task4: 'Preparación de bolsas de repartición en almacén.',
      Task5: 'Promoción de servicios',
      Task6: 'Orientación de estudiantes en puntos de repartición.',
    },
    //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
    YourBenefitsList: {
      Benefit1:
        'Ambiente agradable en una empresa joven y de rápido crecimiento.',
      Benefit2:
        'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
      Benefit3:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit4:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit5:
        'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit6:
        'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
    },
    //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
    ProfileList: {
      Attribute1: 'Edad: 18 - 50 años',
      Attribute2: 'Conocimientos en word, excel, PowerPoint.',
      Attribute3:
        'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
    },
  },

  /////////////////////////
  //       Job3          //
  /////////////////////////

  {
    id: 3,
    JobTitle: 'Desarrollador frontend con React',
    CardDescription:
      'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
    SpecificationList1: [
      {
        Location: 'Ciudad Universitaria',
        PublishingDate: '26/10/2021',
        Salary: '25 000 EUR',
      },
    ],
    SpecificationList2: [
      {
        Experience: '2 años',
        Contract: 'Temporal',
      },
    ],
    RequirementsList: [
      {
        MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
        Experience: '2 Años',
        Availability: '8 horas diarias',
      },
    ],
    Image: LogisticsImage,
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
    //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
    TasksList: {
      Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
      Task2:
        'Apoyo en la recolección de bienes para su posterior distribución.',
      Task3:
        'Conducción de furgoneta para recogida y posterior distribución de materiales.',
      Task4: 'Preparación de bolsas de repartición en almacén.',
      Task5: 'Promoción de servicios',
      Task6: 'Orientación de estudiantes en puntos de repartición.',
    },
    //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
    YourBenefitsList: {
      Benefit1:
        'Ambiente agradable en una empresa joven y de rápido crecimiento.',
      Benefit2:
        'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
      Benefit3:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit4:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit5:
        'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
      Benefit6:
        'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
    },
    //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
    ProfileList: {
      Attribute1: 'Edad: 18 - 50 años',
      Attribute2: 'Conocimientos en word, excel, PowerPoint.',
      Attribute3:
        'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
    },
  },
];

/////////////////////////
//   Object template   //
/////////////////////////

// {
//     id: ,
//     JobTitle: '',
//     CardDescription:'',
//     SpecificationList1: [
//       {
//         Location: '',
//         PublishingDate: '',
//         Salary: '',
//       },
//     ],
//     SpecificationList2: [
//       {
//         Experience: '',
//         Contract: '',
//       },
//     ],
//     RequirementsList: [
//       {
//         MinimumStudies: '',
//         Experience: '',
//         Availability: '',
//       },
//     ],
//     Image: ,
//     Description:'',
//     TasksList: {
//       Task1: '',
//       Task2:'',
//       Task3:'',
//       Task4: '',
//       Task5: '',
//       Task6: '',
//     },
//     YourBenefitsList: {
//       Benefit1:'',
//       Benefit2:'',
//       Benefit3:'',
//       Benefit4:'',
//       Benefit5:'',
//       Benefit6:'',
//     },
//     ProfileList: {
//       Attribute1: '',
//       Attribute2: '',
//       Attribute3:'',
//     },
//   }
