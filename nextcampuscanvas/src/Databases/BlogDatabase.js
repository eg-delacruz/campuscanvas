//Small Images (for covers and small devices)
import Canva_Prezi_Infogram_Small from '../assets/PagesImages/BlogImages/Canva_Prezi_Infogram/SmallPostImage.jpg';
import Network_42_Small from '../assets/PagesImages/BlogImages/42_Network/Network_42_small.jpg';
import AI_Small from '../assets/PagesImages/BlogImages/Inteligencia artificial/Small.jpg';

//Large Images (for large devices)
import Canva_Prezi_Infogram_Large from '../assets/PagesImages/BlogImages/Canva_Prezi_Infogram/LargePostImage.jpg';
import Network_42_Large from '../assets/PagesImages/BlogImages/42_Network/Network_42_large.jpg';
import AI_Large from '../assets/PagesImages/BlogImages/Inteligencia artificial/Big.jpg';

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
    id: '1', //Slug in Contentful
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
    id: '2',
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
      `En <strong>Campus Canvas</strong> estamos seguros de que no te vas a arrepentir si decides lanzarte a esta piscina de innovación, donde vas a desarrollar habilidades cognitivas y tecnológicas que quizá ni tú sabías que poseías. Y esto no te lo decimos por pura suposición, te lo aseguramos porque parte de nuestro equipo tuvo la oportunidad de asistir a uno de los OpenDays del campus de <strong>42 en Madrid</strong>, y fue una experiencia fascinante, por ello te invitamos a que la vivas por ti mismo y no te quedes con la duda.`,
    ],
  },
  {
    id: '3',
    Title: 'Explorando el Futuro de la Inteligencia Artificial',
    PubDate: '30/01/2023',
    SmallImage: AI_Small,
    LargeImage: AI_Large,
    Author: `<a href='https://caffeineandwritings.wordpress.com' target='_blank'>Rapha Guardado</a>`,
    Content: [
      `Las Inteligencias Artificiales <strong>(IA)</strong> han avanzado significativamente en los últimos años, siendo una herramienta cada vez más importante para el desarrollo tecnológico. Su relevancia y su impacto se ven reflejados en la vida cotidiana, desde la automatización de tareas hasta la detección de patrones complejos. Algunos ejemplos de IA son el reconocimiento facial, el reconocimiento de voz, la traducción automática, la conducción autónoma, entre otros. La IA se ha convertido en una herramienta fundamental para mejorar la accesibilidad y la productividad en la sociedad moderna.`,
      `¿Me creerías si te digo que el párrafo introductorio fue creado 100% por una IA únicamente haciendo una pregunta sencilla? ¡La respuesta es sí! Seguro no te sorprende mucho, y es que por mucho que nos neguemos a integrar las IAs a nuestra cotidianidad, estas son ya una realidad. O aprendemos a usarlas y las integramos en nuestras vidas, o nos quedamos en el pasado deseando haber sacado provecho de ellas.`,
      `Como sabrás, en los últimos años, los avances tecnológicos y el desarrollo de las IAs nos han llevado a modificar nuestros hábitos, dándonos un giro de 360º. El 2022 fue el año de las IAs, y herramientas como <a href='https://openai.com/dall-e-2/' target='_blank'><strong>Dalle2</strong></a>, <a href='https://deepai.org/machine-learning-model/text2img' target='_blank'><strong>Image</strong></a>, <a href='https://9to5google.com/2022/06/22/google-ai-parti-generato/' target='_blank'><strong>Parti de Google</strong></a> y  <a href='https://midjourney.com/home/?callbackUrl=%2Fapp%2F' target='_blank'><strong>Midjourney</strong></a> nos hicieron flipar, pero sin duda, quienes mejor se consolidaron y se posicionaron como la cereza en el pastel fueron Stable Diffusion y ChatGPT, sobre las que hoy vengo a contarte un poco.`,
      `<a href='https://chat.openai.com/auth/login' target='_blank'><strong>ChatGPT</strong></a> es un modelo de lenguaje desarrollado por la empresa <a href='https://openai.com/' target='_blank'><strong>OpenAI</strong></a>, el cual es, de momento, gratuito. Su fin principal es la generación de texto, y para ello ha sido entrenada con cantidades inimaginables de texto. Es uno de los sistemas de IA mas impresionantes, pues puede responder casi a todo lo que le pidas, como traducciones, guiones específicos para redes sociales, artículos de cualquier tema y en cualquier tono regionalista, líneas de código, fichas técnicas, letras de canciones, chistes y todo lo que tenga que ver con el lenguaje. Sus respuestas son muy acertadas y completas, y posee un sentido de contexto. No obstante, no te recomendamos poner información personal, como datos bancarios, direcciones o contraseñas, pues todo lo escrito en ChatGPT será registrado y utilizado por los desarrolladores para seguir entrenando y mejorando este sistema, por ello te sugerimos usar esta tecnología responsablemente. `,
      `<a href='https://stability.ai/' target='_blank'><strong>Stable Diffusion</strong></a> es un modelo de aprendizaje automático, gratuito y de código abierto, que fue desarrollado por <a href='https://stability.ai/' target='_blank'><strong>Stability AI</strong></a>. Fue entrenado por personas que querían un modelo libre y abierto para todo público, y que a su vez compitiera con herramientas como Dalle2, Image y Midjourney. Esta herramienta es tipo <strong>Text to Image</strong>, lo cual quiere decir que genera imágenes mediante una descripción escrita en el generador de imágenes. Esta IA es capaz de generar imágenes de personas reales sin restricciones de censura y en alta calidad. Además, maneja múltiples estilos artísticos y puede optimizar imágenes y corregirlas. Su magnitud y popularidad es tan grande que múltiples aplicaciones, startups, paginas web, empresas y diferentes entidades, están usando este modelo para crear sus productos. Registrarse es muy sencillo, solo tienes que dirigirte a <a href='https://beta.dreamstudio.ai/home' target='_blank'><strong>DreamStudio</strong></a>, donde encontrarás una interfaz amigable que te permitirá generar tus imágenes. Completar el registro con una cuenta de correo electrónico te tomara solo un suspiro. `,
      `Indudablemente, las IAs poco a poco están transformando nuestras vidas y facilitando cada vez más nuestra rutina diaria en el trabajo, en los estudios, en el hogar y en nuestra vida personal. Desde Campus Canvas queremos siempre darte las mejores recomendaciones y brindarte contenido de interés, por ello te recomendamos hagas un uso adecuado y responsable de las nuevas tecnologías y de estas herramientas que sin duda te serán de mucha utilidad. `,
    ],
  },
];

//<a href='URL' target='_blank'><strong>Texto</strong></a>

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
