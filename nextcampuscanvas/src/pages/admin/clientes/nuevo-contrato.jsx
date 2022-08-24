import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Session
import { useSession } from 'next-auth/react';

//Styles
import styles from '@pagestyles/admin/nuevoContrato.module.scss';

//Components
import SecondaryHeader from '@components/GeneralUseComponents/SecondaryHeader/SecondaryHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//Assets
import arrow_right_white from '@assets/GeneralUse/IconsAndButtons/arrow_right_white.svg';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Services
import dateToLetters from '@services/dateToLetters.js';

const nuevoContrato = () => {
  const [state, setState] = useState({
    submitLoading: false,
    loading: true,
    error: null,
  });

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (
      !(
        session?.token.role === 'super_admin' || session?.token.role === 'admin'
      )
    ) {
      router.push('/');
    }
  }

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      setState({ ...state, loading: false });
    }
  }, [session]);

  //Controlling inputs
  const LUGAR_DE_CREACION = useInputValue('Madrid');
  const FECHA_DE_CREACION = useInputValue(
    dateToLetters.dateToLetterswithOutDay(new Date())
  );
  const PERIODO = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null });
    const DATA = {
      LUGAR_DE_CREACION: LUGAR_DE_CREACION.value,
      FECHA_DE_CREACION: FECHA_DE_CREACION.value,
      PERIODO: PERIODO.value,
    };
    console.log(DATA);
  };

  if (state.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SecondaryHeader />
      <div className={`${styles.container} container`}>
        <Link href={'/admin/clientes'}>
          <button className={`${styles.button_back} btn button--red`}>
            <span>
              <Image src={arrow_right_white} />
            </span>
            <div>Atrás</div>
          </button>
        </Link>
        <h1>Nuevo contrato</h1>

        <form
          action=''
          method='POST'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <h3>Lugar y fecha</h3>
          <div className={styles.inputs_container}>
            <div>
              <label htmlFor='lugar' className={`${styles.input_title}`}>
                Lugar de creación
              </label>
              <input
                className={`${styles.input}`}
                name='lugar'
                id='lugar'
                type='text'
                placeholder='Lugar de creación'
                autoComplete='off'
                value={LUGAR_DE_CREACION.value}
                onChange={LUGAR_DE_CREACION.onChange}
              />
            </div>

            <div>
              <label htmlFor='Fecha' className={`${styles.input_title}`}>
                Fecha de creación
              </label>
              <input
                className={`${styles.input}`}
                name='Fecha'
                id='Fecha'
                type='text'
                placeholder='Fecha de creación'
                autoComplete='off'
                value={FECHA_DE_CREACION.value}
                onChange={FECHA_DE_CREACION.onChange}
              />
            </div>

            <div>
              <label htmlFor='Periodo' className={`${styles.input_title}`}>
                Período
              </label>
              <input
                className={`${styles.input}`}
                list='periodos'
                id='periodo'
                name='periodo'
                placeholder='Período'
                autoComplete='off'
                value={PERIODO.value}
                onChange={PERIODO.onChange}
              />
              <datalist id='periodos'>
                <option value='OTOÑO-INVIERNO 2022' />
                <option value='PRIMAVERA-VERANO 2023' />
                <option value='OTOÑO-INVIERNO 2023' />
                <option value='PRIMAVERA-VERANO 2024' />
                <option value='OTOÑO-INVIERNO 2024' />
                <option value='PRIMAVERA-VERANO 2025' />
                <option value='OTOÑO-INVIERNO 2025' />
                <option value='PRIMAVERA-VERANO 2026' />
                <option value='OTOÑO-INVIERNO 2026' />
                <option value='PRIMAVERA-VERANO 2027' />
                <option value='OTOÑO-INVIERNO 2027' />
                <option value='PRIMAVERA-VERANO 2028' />
                <option value='OTOÑO-INVIERNO 2028' />
              </datalist>
            </div>
          </div>
          <h3>Datos del cliente</h3>
          <h3>Actividad del cliente</h3>
          <h3>Características de la campaña publicitaria</h3>
          <h3>Fechas del contrato</h3>
          <h3>Precio y forma de pago</h3>
          <h3>Correos de contacto</h3>
          <button
            type='submit'
            className={`${styles.submit_button} ${
              state.submitLoading && styles.buttonLoading
            } btn button--red`}
            disabled={state.submitLoading}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default nuevoContrato;
