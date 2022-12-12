//Small Images (for covers and small devices)
import SmallImagePost1 from '../assets/PagesImages/BlogImages/Post1/SmallPostImage.jpg';
import SmallImagePost2 from '../assets/PagesImages/BlogImages/Post2/SmallPostImage.jpg';
import SmallImagePost3 from '../assets/PagesImages/BlogImages/Post3/SmallPostImage.jpg';
import SmallImagePost4 from '../assets/PagesImages/BlogImages/Post4/SmallPostImage.jpg';
import SmallImagePost5 from '../assets/PagesImages/BlogImages/Post5/SmallPostImage.jpg';
import Canva_Prezi_Infogram_Small from '../assets/PagesImages/BlogImages/Canva_Prezi_Infogram/SmallPostImage.jpg';
import Network_42_Small from '../assets/PagesImages/BlogImages/42_Network/Network_42_small.jpg';

//Large Images (for large devices)
import LargeImagePost1 from '../assets/PagesImages/BlogImages/Post1//LargePostImage.jpg';
import LargeImagePost2 from '../assets/PagesImages/BlogImages/Post2/LargePostImage.jpg';
import LargeImagePost3 from '../assets/PagesImages/BlogImages/Post3/LargePostImage.jpg';
import LargeImagePost4 from '../assets/PagesImages/BlogImages/Post4/LargePostImage.jpg';
import LargeImagePost5 from '../assets/PagesImages/BlogImages/Post5/LargePostImage.jpg';
import Canva_Prezi_Infogram_Large from '../assets/PagesImages/BlogImages/Canva_Prezi_Infogram/LargePostImage.jpg';
import Network_42_Large from '../assets/PagesImages/BlogImages/42_Network/Network_42_large.jpg';

//Explanation
//ALL REQUIRED
//id:number
//Title: string
//PubDate: string
//SmallImage: image URL
//LargeImage: image URL
//Author: string
//Content: [], each paragraph of post is separated by a ,
//IMPORTANT: Last object in array will always be the main post in main blog url. Rest of post will be displayed from newest on top and oldest on bottom, meaning that they will be displayed from penultimate to earliest in array.
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
    Title: '3 plataformas digitales que no deberías dejar de explorar',
    PubDate: '28/09/2022',
    SmallImage: Canva_Prezi_Infogram_Small,
    LargeImage: Canva_Prezi_Infogram_Large,
    Author: `<a href='https://caffeineandwritings.wordpress.com' target='_blank'>Rapha Guardado</a>`,
    Content: [
      `El desarrollo de nuevas tecnologías, el trabajo híbrido y remoto, y la creación de nuevas plataformas digitales, nos han ayudado a facilitar nuestro desempeño académico y laboral, pero también, nos han impulsado a ser polivalentes, autosuficientes y a consolidar cada vez más nuestras destrezas en el uso de nuevas herramientas digitales, por ello, te presentamos 3 plataformas digitales que quizás no conozcas.`,
      `<a href='https://prezi.com/es/' target='_blank'><strong>Prezi</strong></a>: Esta plataforma virtual, fundada en Budapest en el año 2009, te da la posibilidad de crear presentaciones interactivas, vídeos y diseños excepcionales con sus tres diferentes softwares: Prezi Present, que está enfocado en proporcionarte múltiples herramientas para crear presentaciones originales y dinámicas, las cuales se pueden enlazar con Zoom. Prezi Desing, tiene integrada un conjunto de potentes herramientas de diseños interactivos con las que podrás crear diseños que destaquen. Y Prezi Video, que es el último software incorporado en esta plataforma, te da la posibilidad de acceder a múltiples herramientas que facilitan el trabajo híbrido, sin importar donde estés. Prezi es una herramienta gratuita, sin embargo, para acceder a funciones avanzadas tienes la opción de pago. Está disponible en Inglés, Alemán, Español, Francés, Italiano, Portugués y Chino.`,
      `<a href='https://www.canva.com/' target='_blank'><strong>Canva</strong></a>: Si lo tuyo es la creación de contenido, esta plataforma fundada en 2012  es una opción que te súper recomendamos. Este software y página web te proporciona herramientas de diseño gráfico simplificado, con la cual podrás crear artes, logos, carteles, diseños, tarjetas, curriculums profesionales, posts para redes sociales y presentaciones, entre otras más. Además, dispone de herramientas de Marketing y Pizarras online, lo cual hace de Canva una herramienta ideal para grupos de trabajo remoto. Canva está disponible en versión móvil y web, te permite descargar tus proyectos en formato PDF o guardarlos en la nube, y también dispone de un planificador de contenido y organizador de proyectos. Esta útil plataforma puedes usarla gratis y acceder a muchas herramientas disponibles para esta versión. Si deseas herramientas profesionales de mayor nivel, Canva Pro te proporciona múltiples opciones para crear diseños, contenidos y proyectos de calidad superior.`,
      `<a href='https://infogram.com/es/' target='_blank'><strong>Infogram</strong></a>: ¿Quién dijo que las finanzas, el mundo corporativo y los datos estadísticos debían ser aburridos? Con esta novedosa plataforma web, tus proyectos estarán a otro nivel. Infogram está ideado para ayudar a sus usuarios a crear, diseñar y compartir infografías, gráficos (barras, columnas, tablas, líneas de tiempo, etc.) y mapas conceptuales interactivos y visualmente atractivos que podrás integrar en tus informes, presentaciones, dashboards, reportes y proyectos. Esta plataforma en su versión gratuita te proporciona herramientas básicas de creación de contenidos de alta calidad, y en su versión de pago tendrás acceso ilimitado a todas sus funciones. Además, está disponible en 4 idiomas y es muy fácil de usar una vez finalices el proceso de registro.`,
      `No importa si eres estudiante, emprendedor, profesional o docente, estas 3 útiles plataformas web harán que tus presentaciones, informes, publicaciones sociales y diseños sean de los más top.`,
    ],
  },
  {
    id: '7',
    Title:
      'Estudia en uno de los campus de programación más innovadores del mundo',
    PubDate: '10/12/2022',
    SmallImage: Network_42_Small,
    LargeImage: Network_42_Large,
    Author: `<a href='https://caffeineandwritings.wordpress.com' target='_blank'>Rapha Guardado</a>`,
    Content: [
      `Esto ya es una realidad y es posible gracias a la iniciativa de <a href='https://www.fundaciontelefonica.com/empleabilidad/campus-42/' target='_blank'><strong>Fundación Telefónica España</strong></a>, la cual pone a tu disposición cuatro Campus Innovadores donde podrás sumergirte en el mundo de la Programación, Ciberseguridad, AI, Blockhaking, Big data y Solf skills.`,
      `¿A que suena muy guay? Pero ¿Qué tal si te dijésemos que lo mejor de esto, es que además de formarte bajo el cobijo de una de las empresas más innovadoras de la región, no necesitas invertir ni un solo euro, más que las ganas, tu tiempo y claro tener 18+? Quizás te preguntaras, ¿Cómo así? Pues bien, esto se debe a que formarte es totalmente gratis. Sí, habéis leído bien, ¡TOTALMENTE GRATIS! Ya mola mas ¿Verdad? Pero aun tenemos un dato extra con el que seguro vais a flipar (porque a nosotros nos pasó). Una de las novedades de esta iniciativa, es que no requieres ninguna titulación, ni conocimientos previos en las áreas antes mencionadas, pues en los campus aprenderás desde cero. Flipaste, ¿verdad?`,
      `Pues bien, esta realidad tiene un nombre y se trata de <a href='https://www.42network.org/' target='_blank'><strong>42 Network</strong></a>, una red de treinta y seis campus de programación distribuidos en cuatro continentes y equipados con lo mejor en tecnología y herramientas de aprendizaje, donde podrás desarrollar tus conocimientos y habilidades tecnológicas en las áreas con la mayor tasa de empleabilidad.
      Su filosofía es: <strong><i>“aprender a aprender”</i></strong>, esto gracias a su innovador modelo pedagógico basado en el aprendizaje entre pares y la gamificación. Dicho de una manera más sencilla, tú aprendes a tu ritmo, sin clases, sin profesores de por medio, sin libros y con instalaciones abiertas 24/7 que te permiten la más entera flexibilidad. Esto significa que tú decides tu horario, mides tu desempeño, tu aprendizaje y tu avance. Este modelo, además de ser innovador y vanguardista, te permitirá desarrollar aptitudes como la creatividad, trabajo en equipo, esfuerzo y superación.  
      `,
      `En España existen cuatro de estos innovadores campus distribuidos en diferentes regiones de la península, los cuales son: <a href='https://www.42madrid.com/' target='_blank'><strong>42Madrid</strong></a>, <a href='https://www.42barcelona.com/es' target='_blank'><strong>42Barcelona</strong></a>, <a href='https://www.42malaga.com/' target='_blank'><strong>42Málaga</strong></a> y <a href='https://www.42urduliz.com/' target='_blank'><strong>42Urduliz (Bizkaia)</strong></a>. Para sumergirte en esta experiencia fuera de serie, basta con ingresar a la página web del campus al que te gustaría asistir y completar una serie de sencillos requisitos como registrarte, realizar un test de habilidades, agendar una cita en uno de los OpenDays, donde conocerás en persona el campus, la metodología y ver con tus propios ojos lo que las instalaciones te ofrecen; luego deberás esperar las fechas de apertura de las “piscinas”, que no son más que un proceso inmersivo que tiene una duración de veintiséis días, al cual debes registrarte para solicitar una plaza y pasar a una lista de espera de candidatos (no te preocupes, no esperarás mucho) y validar tu plaza tras confirmar un correo. Una vez llegues a este punto, el cual es el último, podrás sumergirte en esta experiencia innovadora. Eso sí, no te vamos a mentir, vas a tener que dar tu mayor esfuerzo para finalmente obtener una plaza en cualquiera de los campus de <strong>42 en España</strong> y tener el privilegio de formarte de forma gratuita en áreas que hoy en día son muy demandadas en nuestro país, de la mano de uno de los mejores campus de innovación a nivel mundial.`,
      `En <strong>Campus Canvas</strong> estamos seguros de que no te vas a arrepentir si decides lanzarte a esta piscina de innovación, donde vas a desarrollar habilidades cognitivas y tecnológicas que quizá ni tú sabías que poseías. Y esto no te lo decimos por pura suposición, te lo aseguramos porque parte de nuestro equipo tuvo la oportunidad de asistir a uno de los OpenDays del campus de <strong>42 en España</strong>, y fue una experiencia fascinante, por ello te invitamos a que la vivas por ti mismo y no te quedes con la duda.`,
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
