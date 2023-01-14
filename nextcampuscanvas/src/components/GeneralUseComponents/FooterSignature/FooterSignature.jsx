import styles from './Footer_signature.module.scss';
export default function () {
  //Get current year
  const YEAR = new Date().getFullYear();

  return (
    <section className={styles.footer__signature}>
      <p>®Campus Canvas {YEAR}. Todos los derechos reservados</p>
      <p>Dedicado a los estudiantes desde Madrid ❤️</p>
    </section>
  );
}
