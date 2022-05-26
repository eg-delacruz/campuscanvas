const GENDERS = ['Femenino', 'Masculino'];
//Ordenarlas de A - Z cuando estén completas
//o utilizar método .sort() de arrays, que al
//parecer devuelve el array ordenado de A - Z

//IMPORTANTE: Al modificar este array, modificar también el
//controller de users en la api, en la función que hace la validación
//del correo estudiantil, añadiéndo la nueva uni
//en minúsculas!!!
const UNIVERSITIES = [
  'Centro de Estudios Financieros CEF',
  'CESINE Centro Universitario',
  'Colegio Universitario de Estudios Financieros CUNEF',
  'Deusto Business School',
  'EADA Business School',
  'EAE Business School',
  'ESADE Law & Business School',
  'ESCI-UPF',
  'Escola d Art i Superior de Disseny de les Illes Balears',
  'Escola Superior de Disseny ESDI',
  'Escola Universitària d Hoteleria i Turisme CETT',
  'Escuela Autónoma de Dirección de Empresas EADE',
  'Escuela de Organización Industrial EOI',
  'Escuela Europea de Dirección y Empresa EUDE',
  'Escuela Superior de Administración y Dirección de Empresas ESADE',
  'Escuela Superior de Gestion Comercial y Marketing ESIC',
  'Escuela Superior de Música de Cataluña ESMUC',
  'Escuela Superior Politécnica del TecnoCampus',
  'Escuela Técnica superior de Ingeniería Aeronáutica y del Espacio',
  'Escuela Técnica Superior de Ingeniería de Montes, Forestal y del Medio Natural',
  'Escuela Técnica Superior de Ingenieros Agronomos',
  'Escuela Técnica Superior de Ingenieros Navales',
  'Escuela Universitaria de Diseño, Innovación y Tecnología',
  'Escuela Universitaria de Fisioterapia ONCE',
  'Florida Centro de Formación',
  'Fundació Universitària del Bages FUB',
  'IE Universidad',
  'IMF Business School',
  'IQS Institut Químic de Sarrià',
  'Mondragon Unibertsitatea',
  'Saint Louis University',
  'UNIR, Universidad en Internet',
  'Universidad Alfonso X el Sabio UAX',
  'Universidad Antonio de Nebrija',
  'Universidad Autónoma de Madrid UAM',
  'Universidad Camilo José Cela UCJC',
  'Universidad Cardenal Herrera CEU',
  'Universidad Carlos III de Madrid UC3M',
  'Universidad Católica de Valencia San Vicente Mártir',
  'Universidad Católica San Antonio UCAM',
  'Universidad CEU San Pablo',
  'Universidad Complutense de Madrid UCM',
  'Universidad de Alcalá de Henares UAH',
  'Universidad de Alicante UA',
  'Universidad de Almería UAL',
  'Universidad de Barcelona UB',
  'Universidad de Burgos UBU',
  'Universidad de Cádiz UCA',
  'Universidad de Cantabria UNICAN',
  'Universidad De Castilla-La Mancha',
  'Universidad de Córdoba UCO',
  'Universidad de Extremadura UNEX',
  'Universidad de Granada UGR',
  'Universidad de Huelva UHU',
  'Universidad de Jaén UJAEN',
  'Universidad de la Laguna ULL',
  'Universidad de La Rioja UNIRIOJA',
  'Universidad de las Hespérides',
  'Universidad de las Palmas de Gran Canaria ULPGC',
  'Universidad de León UNILEON',
  'Universidad de Málaga',
  'Universidad de Marbella',
  'Universidad de Murcia UM',
  'Universidad de Oviedo',
  'Universidad de Salamanca USAL',
  'Universidad de Santiago de Compostela',
  'Universidad de Sevilla US',
  'Universidad de Valladolid UVA',
  'Universidad de Zaragoza UNIZAR',
  'Universidad del Atlántico Medio',
  'Universidad del País Vasco / Euskal Herriko Unibertsitatea',
  'Universidad Eclesiástica San Dámaso',
  'Universidad Europea de Canarias',
  'Universidad Europea de Madrid UEM',
  'Universidad Europea del Atlántico',
  'Universidad Fernando Pessoa Canarias',
  'Universidad Francisco de Vitoria UFV',
  'Universidad Internacional de Andalucía UNIA',
  'Universidad Internacional de la Rioja',
  'Universidad Internacional de Valencia',
  'Universidad Internacional Isabel I de Castilla',
  'Universidad Internacional Menéndez Pelayo UIMP',
  'Universidad Loyola Andalucía',
  'Universidad Miguel Hernández de Elche UMH',
  'Universidad Nacional de Educación a Distancia UNED',
  'Universidad Pablo de Olavide UPO',
  'Universidad Politécnica de Cartagena UPCT',
  'Universidad Politécnica de Madrid UPM',
  'Universidad Pontificia Comillas',
  'Universidad Pontificia de Salamanca',
  'Universidad Pública de Navarra UNAVARRA',
  'Universidad Rey Juan Carlos URJC',
  'Universidad San Jorge USJ',
  'Universidad Villanueva UV',
  'Universidade da Coruña UDC',
  'Universidade de Vigo UVIGO',
  'Universitat Abat Oliba CEU UAO',
  'Universitat Autónoma de Barcelona UAB',
  'Universitat de Girona UDG',
  'Universitat de les Illes Balears UIB',
  'Universitat de Lleida UDL',
  'Universitat de Valencia UV',
  'Universitat de VIC UVIC',
  'Universitat Internacional de Catalunya UIC',
  'Universitat Jaume I UJI',
  'Universitat Politécnica de Catalunya UPC',
  'Universitat Politécnica de Valencia UPV',
  'Universitat Pompeu Fabra UPF',
  'Universitat Ramon Llull URL',
  'Universitat Rovira i Virgilu URV',
];

const FACULTIES = [
  'Administración de Empresas ADE',
  'Agricultura/Silvicultura',
  'Arquitectura',
  'Bellas Artes/Diseño/Música',
  'Ciencias de la Salud',
  'Ciencias del deporte',
  'Ciencias Económicas  y Empresariales',
  'Ciencias Naturales',
  'Ciencias Sociales',
  'Derecho',
  'Educación y formación de profesorado',
  'Estadística',
  'Estudios Culturales',
  'Filosofía',
  'Geología',
  'Informática',
  'Ingeniería',
  'Ingeniería Civil',
  'Ingeniería Eléctrica',
  'Ingeniería Industrial',
  'Ingeniería Mecánica',
  'Lingüística',
  'Matemáticas',
  'Medicina/Farmacia',
  'Otros',
  'Pedagogía',
  'Periodismo',
  'Psicología',
  'Religión/Teología',
  'Trabajo Social',
];

export default {
  UNIVERSITIES,
  FACULTIES,
  GENDERS,
};
