//Routes must be an array
export default async function routeRevalidator(res, routes) {
  //CLARIFICATIONS:
  //1. If there was an error, Next.js will continue to show the last successfully generated page.
  //2. If a received route is NOT SSG, but dinamically generated (eg useEffect), that will console.error
  if (res.revalidate && routes.length !== 0) {
    routes.forEach(async (route) => {
      try {
        await res.revalidate(route);
        console.log('Ruta revalidada: ' + route);
      } catch (err) {
        console.error('Error al revalidar ruta ' + err);
      }
    });
  }
}
