//images
import LogisticsImage from '../assets/static/PagesImages/EmpleosImages/AyudanteLogistica/logistics_image.jpg';

//Explanation:
//id isRequired as number
//JofTitle isRequired as string
//CardDescription is required as string
//All attributes of SpecificationList1 and SpecificationList2 are required as array
//All attributes of RequirementsList are required as array
//Image isRequired as image
//Description isRequired as string
//TasksList isRequired as object
//YourBenefitsList isRequired as an object
//ProfileList isRequired as an object

//In case of no jobs, let JOBS be []
export const JOBS = [
  {
    /////////////////////////
    //       Job1          //
    /////////////////////////
    id: 1,
    JobTitle: 'Ayudante en tareas logísticas y de distribución',
    CardDescription:
      'Se necesita ayudante para realizar tareas logísticas y de distribución relacionadas con nuestro servicio Campus Bag. Esto va desde la recolección de la materia prima y de los productos a repartir, llevarlos al almacenamiento, hasta la preparación de estos para su posterior distribución en universidades.',
    SpecificationList1: [
      {
        Location: 'Por definir',
        PublishingDate: '16/01/2022',
        Salary: 'Por concretar',
      },
    ],
    SpecificationList2: [
      {
        Experience: 'sin experiencia mínima requerida',
        Contract: 'Por definir',
      },
    ],
    //Nótese que las palabras MinimumStudies, Experience y Availability NO pueden cambiarse ni quitarse. Plus es opcional.
    RequirementsList: [
      {
        MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
        Experience: 'sin experiencia mínima requerida',
        Availability: '8 horas diarias',
        Plus: 'Carnet de conducir es un plus',
      },
    ],
    Image: LogisticsImage,
    Description:
      'Se necesita ayudante para realizar tareas logísticas y de distribución relacionadas con nuestro servicio Campus Bag. Esto va desde la recolección de la materia prima y de los productos a repartir, llevarlos al almacenamiento, hasta la preparación de estos para su posterior distribución en universidades. Puesto que el servicio está en sus primeras etapas, se espera que el candidato participe activamente en la planificación e implementación de procesos a llevar a cabo de manera eficiente, y de esta manera sentar las bases para el correcto funcionamiento del servicio.',
    //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
    TasksList: {
      Task1:
        'Apoyo en la recolección de los materiales para la confección de la bolsa, como cajas, folletos y productos publicitarios de nuestros clientes.',
      Task2: 'Gestión y control de materiales en almacén',
      Task3:
        'Preparación en almacén de las bolsas, desde la colocación de los productos publicitarios en estas, hasta su empaquetamiento en cajas para su posterior distribución.',
      Task4:
        'Apoyo en la repartición de bolsas a estudiantes en puntos de distribución',
      Task5:
        'Orientación de estudiantes y supervisión en puntos de repartición',
      Task6: 'Promoción del servicio Campus Bag',
      Task7:
        'En caso de contar con los documentos pertinentes, conducción de furgoneta para realizar algunas de las tareas anteriores.',
    },
    //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
    YourBenefitsList: {
      Benefit1:
        'Ambiente agradable en una empresa joven y de rápido crecimiento, al cual podrás contribuir en gran medida al ser uno de los primeros empleados.',
      Benefit2:
        'Posibilidad de formar una cultura empresarial sana y de apoyo mutuo dentro del equipo, sin lugar a discriminación por creencias, apariencia física, género, orientación sexual, etc.',
      Benefit3:
        'Participar de una actividad interesante y al aire libre, la cual es la de repartir bolsas a los estudiantes, brindándoles así una sonrisa y fomentando un espacio lleno de energía y buena vibra.',
      Benefit4:
        'En un futuro, posibilidad de ser partícipe y aprender de otras areas dentro de la empresa, a medida que las necesidades aparezcan en el camino.',
    },
    //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
    ProfileList: {
      Attribute1: 'Edad: 20 - 35 años',
      Attribute2: 'Conocimientos de Mirosoft Word, Excel y PowerPoint',
      Attribute3:
        'Habilidades blandas: fuerte sentido de responsabilidad, organización y planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas individualmente y en equipo.',
    },
  },
  /////////////////////////
  //       Job2          //
  /////////////////////////
  // {
  //   id: 2,
  //   JobTitle: 'Desarrollador Backend con Node JS y MongoDB',
  //   CardDescription:
  //     'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
  //   SpecificationList1: [
  //     {
  //       Location: 'Ciudad Universitaria',
  //       PublishingDate: '26/10/2021',
  //       Salary: '25 000 EUR',
  //     },
  //   ],
  //   SpecificationList2: [
  //     {
  //       Experience: '2 años',
  //       Contract: 'Temporal',
  //     },
  //   ],
  //   RequirementsList: [
  //     {
  //       MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
  //       Experience: '2 Años',
  //       Availability: '8 horas diarias',
  //     },
  //   ],
  //   Image: LogisticsImage,
  //   Description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
  //   //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
  //   TasksList: {
  //     Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
  //     Task2:
  //       'Apoyo en la recolección de bienes para su posterior distribución.',
  //     Task3:
  //       'Conducción de furgoneta para recogida y posterior distribución de materiales.',
  //     Task4: 'Preparación de bolsas de repartición en almacén.',
  //     Task5: 'Promoción de servicios',
  //     Task6: 'Orientación de estudiantes en puntos de repartición.',
  //   },
  //   //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
  //   YourBenefitsList: {
  //     Benefit1:
  //       'Ambiente agradable en una empresa joven y de rápido crecimiento.',
  //     Benefit2:
  //       'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
  //     Benefit3:
  //       'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit4:
  //       'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit5:
  //       'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit6:
  //       'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //   },
  //   //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
  //   ProfileList: {
  //     Attribute1: 'Edad: 18 - 50 años',
  //     Attribute2: 'Conocimientos en word, excel, PowerPoint.',
  //     Attribute3:
  //       'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
  //   },
  // },
  /////////////////////////
  //       Job3          //
  /////////////////////////
  // {
  //   id: 3,
  //   JobTitle: 'Desarrollador frontend con React',
  //   CardDescription:
  //     'Aquí va una pequeña descripción del perfil que estamos buscando. Se describen un poco las habilidades requeridas de una manera interesante y corta. Pueden mencionarse las tecnologías que el solicitante deberá dominar de manera rápida. Quizá poner algunas actividades extra que se llevarán a cabo con otros equipos o el propósito de lo que se quiere lograr con este cargo.',
  //   SpecificationList1: [
  //     {
  //       Location: 'Ciudad Universitaria',
  //       PublishingDate: '26/10/2021',
  //       Salary: '25 000 EUR',
  //     },
  //   ],
  //   SpecificationList2: [
  //     {
  //       Experience: '2 años',
  //       Contract: 'Temporal',
  //     },
  //   ],
  //   RequirementsList: [
  //     {
  //       MinimumStudies: 'Escuela Primaria Obligatoria (ESO)',
  //       Experience: '2 Años',
  //       Availability: '8 horas diarias',
  //     },
  //   ],
  //   Image: LogisticsImage,
  //   Description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.Integer eu nibh at nisi ullamcorper sagittis id vel leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, pe.',
  //   //Nótese que TaskList es un objeto, NO UN ARRAY, para poder pasar tasks indefinidos.
  //   TasksList: {
  //     Task1: 'Ayuda en la repartición de bolsas en puntos de distribución.',
  //     Task2:
  //       'Apoyo en la recolección de bienes para su posterior distribución.',
  //     Task3:
  //       'Conducción de furgoneta para recogida y posterior distribución de materiales.',
  //     Task4: 'Preparación de bolsas de repartición en almacén.',
  //     Task5: 'Promoción de servicios',
  //     Task6: 'Orientación de estudiantes en puntos de repartición.',
  //   },
  //   //Nótese que YourBenefitsList es un objeto, NO UN ARRAY, para poder pasar benefits indefinidos.
  //   YourBenefitsList: {
  //     Benefit1:
  //       'Ambiente agradable en una empresa joven y de rápido crecimiento.',
  //     Benefit2:
  //       'Promovemos una cultura sana y de apoyo mutuo dentro de nuestro equipo, sin dejar lugar a la discriminación por apariencia física, creencias, género, orientación sexual, etc.',
  //     Benefit3:
  //       'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit4:
  //       'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit5:
  //       'PClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //     Benefit6:
  //       'OriClass aptent taciti sociosqu ad litora torquent per conubia nostra.',
  //   },
  //   //Nótese que ProfileList es un objeto, NO UN ARRAY, para poder pasar características indefinidos.
  //   ProfileList: {
  //     Attribute1: 'Edad: 18 - 50 años',
  //     Attribute2: 'Conocimientos en word, excel, PowerPoint.',
  //     Attribute3:
  //       'Habilidades blandas: organización, planificación, habilidad excepcional para comunicar, capacidad de resolución de problemas por sí solo o en equipo.',
  //   },
  // },
];

/////////////////////////
//   Object template   //
/////////////////////////

//Copiar y pegar este objeto, y rellenar los campos requeridos.

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
