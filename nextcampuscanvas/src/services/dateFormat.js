const dateToLetterswithDay = (date) => {
  let days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const DATE = `${days[new Date(date).getDay()]} ${new Date(
    date
  ).getDate()} de ${months[new Date(date).getMonth()]} de ${new Date(
    date
  ).getFullYear()}`;
  return DATE;
};

function dateToLetterswithOutDay(date) {
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const DATE = `${new Date(date).getDate()} de ${
    months[new Date(date).getMonth()]
  } de ${new Date(date).getFullYear()}`;
  return DATE;
}

const monthAndYearOfDate = (date) => {
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const DATE = `${months[new Date(date).getMonth()]} de ${new Date(
    date
  ).getFullYear()}`;
  return DATE;
};

const shortSlashDate = (date) => {
  const format = new Intl.DateTimeFormat('es-sp', {
    dateStyle: 'short',
  });
  return format.format(date);
};

const SlashDate = (date) => {
  const format = new Intl.DateTimeFormat('es-sp');
  return format.format(date);
};

//Function that gets a date and returns the date in format yyyy-mm-dd
const dateToYMD = (date) => {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
};

export default {
  dateToLetterswithDay,
  dateToLetterswithOutDay,
  monthAndYearOfDate,
  shortSlashDate,
  SlashDate,
  dateToYMD,
};
