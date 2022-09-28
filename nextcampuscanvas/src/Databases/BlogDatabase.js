//Small Images (for covers and small devices)
import SmallImagePost1 from '../assets/PagesImages/BlogImages/Post1/SmallPostImage.jpg';
import SmallImagePost2 from '../assets/PagesImages/BlogImages/Post2/SmallPostImage.jpg';
import SmallImagePost3 from '../assets/PagesImages/BlogImages/Post3/SmallPostImage.jpg';
import SmallImagePost4 from '../assets/PagesImages/BlogImages/Post4/SmallPostImage.jpg';
import SmallImagePost5 from '../assets/PagesImages/BlogImages/Post5/SmallPostImage.jpg';
import SmallImagePost6 from '../assets/PagesImages/BlogImages/Post6/SmallPostImage.jpg';
import SmallImagePost7 from '../assets/PagesImages/BlogImages/Post7/SmallPostImage.jpg';

//Large Images (for large devices)
import LargeImagePost1 from '../assets/PagesImages/BlogImages/Post1//LargePostImage.jpg';
import LargeImagePost2 from '../assets/PagesImages/BlogImages/Post2/LargePostImage.jpg';
import LargeImagePost3 from '../assets/PagesImages/BlogImages/Post3/LargePostImage.jpg';
import LargeImagePost4 from '../assets/PagesImages/BlogImages/Post4/LargePostImage.jpg';
import LargeImagePost5 from '../assets/PagesImages/BlogImages/Post5/LargePostImage.jpg';
import LargeImagePost6 from '../assets/PagesImages/BlogImages/Post6/LargePostImage.jpg';
import LargeImagePost7 from '../assets/PagesImages/BlogImages/Post7/LargePostImage.jpg';

//Explanation
//ALL REQUIRED
//id:number
//Title: string
//PubDate: string
//SmallImage: image URL
//LargeImage: image URL
//Author: string
//Content: [], each paragraph of post is separated by a ,
//IMPORTANT: Last object in array will always be the main post in main blog url
export const POSTS = [
  {
    id: '1',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost1,
    LargeImage: LargeImagePost1,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },

  {
    id: '2',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost2,
    LargeImage: LargeImagePost2,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },

  {
    id: '3',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost3,
    LargeImage: LargeImagePost3,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },

  {
    id: '4',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost4,
    LargeImage: LargeImagePost4,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },

  {
    id: '5',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost5,
    LargeImage: LargeImagePost5,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },

  {
    id: '6',
    Title: 'Título del post',
    PubDate: '10/11/2021',
    SmallImage: SmallImagePost6,
    LargeImage: LargeImagePost6,
    Author: 'Gerardo De La Cruz',
    Content: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
  {
    id: '7',
    Title: '3 plataformas digitales que no deberías dejar de explorar',
    PubDate: '28/09/2022',
    SmallImage: SmallImagePost7,
    LargeImage: LargeImagePost7,
    Author: `<a href='https://caffeineandwritings.wordpress.com' target='_blank'>Rapha Guardado</a>`,
    Content: [
      `El desarrollo de nuevas tecnologías, el trabajo híbrido y remoto, y la creación de nuevas plataformas digitales, nos han ayudado a facilitar nuestro desempeño académico y laboral, pero también, nos han impulsado a ser polivalentes, autosuficientes y a consolidar cada vez más nuestras destrezas en el uso de nuevas herramientas digitales, por ello, te presentamos 3 plataformas digitales que quizás no conozcas.`,
      `<a href='https://prezi.com/es/' target='_blank'><strong>Prezi</strong></a>: Esta plataforma virtual, fundada en Budapest en el año 2009, te da la posibilidad de crear presentaciones interactivas, vídeos y diseños excepcionales con sus tres diferentes softwares: Prezi Present, que está enfocado en proporcionarte múltiples herramientas para crear presentaciones originales y dinámicas, las cuales se pueden enlazar con Zoom. Prezi Desing, tiene integrada un conjunto de potentes herramientas de diseños interactivos con las que podrás crear diseños que destaquen. Y Prezi Video, que es el último software incorporado en esta plataforma, te da la posibilidad de acceder a múltiples herramientas que facilitan el trabajo híbrido, sin importar donde estés. Prezi es una herramienta gratuita, sin embargo, para acceder a funciones avanzadas tienes la opción de pago. Está disponible en Inglés, Alemán, Español, Francés, Italiano, Portugués y Chino.`,
      `<a href='https://www.canva.com/' target='_blank'><strong>Canva</strong></a>: Si lo tuyo es la creación de contenido, esta plataforma fundada en 2012  es una opción que te súper recomendamos. Este software y página web te proporciona herramientas de diseño gráfico simplificado, con la cual podrás crear artes, logos, carteles, diseños, tarjetas, curriculums profesionales, posts para redes sociales y presentaciones, entre otras más. Además, dispone de herramientas de Marketing y Pizarras online, lo cual hace de Canva una herramienta ideal para grupos de trabajo remoto. Canva está disponible en versión móvil y web, te permite descargar tus proyectos en formato PDF o guardarlos en la nube, y también dispone de un planificador de contenido y organizador de proyectos. Esta útil plataforma puedes usarla gratis y acceder a muchas herramientas disponibles para esta versión. Si deseas herramientas profesionales de mayor nivel, Canva Pro te proporciona múltiples opciones para crear diseños, contenidos y proyectos de calidad superior.`,
      `<a href='https://infogram.com/es/' target='_blank'><strong>Infogram</strong></a>: ¿Quién dijo que las finanzas, el mundo corporativo y los datos estadísticos debían ser aburridos? Con esta novedosa plataforma web, tus proyectos estarán a otro nivel. Infogram está ideado para ayudar a sus usuarios a crear, diseñar y compartir infografías, gráficos (barras, columnas, tablas, líneas de tiempo, etc.) y mapas conceptuales interactivos y visualmente atractivos que podrás integrar en tus informes, presentaciones, dashboards, reportes y proyectos. Esta plataforma en su versión gratuita te proporciona herramientas básicas de creación de contenidos de alta calidad, y en su versión de pago tendrás acceso ilimitado a todas sus funciones. Además, está disponible en 4 idiomas y es muy fácil de usar una vez finalices el proceso de registro.`,
      `No importa si eres estudiante, emprendedor, profesional o docente, estas 3 útiles plataformas web harán que tus presentaciones, informes, publicaciones sociales y diseños sean de los más top.`,
    ],
  },
];

//Structure to copy-paste
// {
// id: '',
// Title: '',
//PubDate: '',
// SmallImage: ,
//LargeImage: ,
// Author: '',
// Content: [
//   '',
//   '',
//   ''
// ],
// }
