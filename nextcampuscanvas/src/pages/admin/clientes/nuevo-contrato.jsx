import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { saveAs } from 'file-saver';

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
import { NumberAsString } from '@services/numberAsString';

//Endpoints
import endPoints from '@services/api';

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

  const TIPO_DE_CLIENTE = useInputValue('');
  const NOMBRE_CLIENTE = useInputValue('');
  const DIRECCION_CLIENTE = useInputValue('');
  const DNI = useInputValue('');
  const EN_CALIDAD_DE = useInputValue('');
  const EMPRESA_REPRESENTADA = useInputValue('');
  const DOMICILIO_EMPRESA = useInputValue('');
  const NIF = useInputValue('');
  const LUGAR_REGISTRO_MERCANTIL = useInputValue('');
  const CORREO_CLIENTE = useInputValue('');

  const ACTIVIDAD_CLIENTE = useInputValue('');
  const PRODUCTO_A_PROMOVER = useInputValue('');

  const TIPO_DE_CAMPANA = useInputValue('');
  const PRODUCTO = useInputValue('');
  const MARCA = useInputValue('');
  const UNIDADES_A_DISTRIBUIR = useInputValue('');

  const INICIO_CONTRATO = useInputValue('');
  const FIN_CONTRATO = useInputValue('');

  const PRECIO = useInputValue('');
  const PRECIO_LETRAS = NumberAsString(PRECIO.value, true);
  const MODALIDAD_DE_PAGO = useInputValue('');
  const FECHA_PAGO_UNICO = useInputValue('');
  const VALOR_POR_CUOTA = parseFloat(PRECIO.value / 4).toFixed(2);
  const FECHA_PRIMERA_CUOTA = useInputValue('');
  const FECHA_SEGUNDA_CUOTA = useInputValue('');
  const FECHA_TERCERA_CUOTA = useInputValue('');
  const FECHA_CUARTA_CUOTA = useInputValue('');

  //Functions
  //Client data radio buttons(start)
  const isClientTypeRadioSelected = (value) => TIPO_DE_CLIENTE.value === value;
  const handleRadioClientTypeClick = (e) => {
    TIPO_DE_CLIENTE.setValue(e.currentTarget.value);
  };
  //Client data radio buttons(end)

  //Campaign data radio buttons (start)
  const isCampaignTypeRadioSelected = (value) =>
    TIPO_DE_CAMPANA.value === value;
  const handleRadioCampaignTypeClick = (e) => {
    TIPO_DE_CAMPANA.setValue(e.currentTarget.value);
  };
  //Campaign data radio buttons (end)

  //Way to pay form radio buttons (start)
  const isWayToPayRadioSelected = (value) => MODALIDAD_DE_PAGO.value === value;
  const handleRadioWayToPayClick = (e) => {
    MODALIDAD_DE_PAGO.setValue(e.currentTarget.value);
  };
  //Way to pay form radio buttons (end)

  const createClientDataText = () => {
    let clientDataText;

    if (TIPO_DE_CLIENTE.value === 'juridica') {
      clientDataText = `${NOMBRE_CLIENTE.value}, mayor de edad, con domicilio en ${DIRECCION_CLIENTE.value}, DNI/NIF núm. ${DNI.value}, y en calidad de ${EN_CALIDAD_DE.value}, por tanto, actuando, en virtud de escritura pública y/o autorización pertinente, en nombre y representación de ${EMPRESA_REPRESENTADA.value}, con domicilio en ${DOMICILIO_EMPRESA.value}, CIF/NIF núm. ${NIF.value} e inscrita en: Registro mercantil de ${LUGAR_REGISTRO_MERCANTIL.value}.`;
      return clientDataText;
    }
    if (TIPO_DE_CLIENTE.value === 'fisica') {
      clientDataText = `${NOMBRE_CLIENTE.value}, mayor de edad, con domicilio en ${DIRECCION_CLIENTE.value}, DNI/NIF núm. ${DNI.value}, y en su propio nombre y representación.`;
      return clientDataText;
    }
  };

  const createCampaignDataText = () => {
    let campaignDataText;

    if (TIPO_DE_CAMPANA.value === 'producto') {
      campaignDataText = `El publicista se compromete, de ser requerido, a recoger ${UNIDADES_A_DISTRIBUIR.value} unidades del producto “${PRODUCTO.value}” de la marca ${MARCA.value} en el lugar que el cliente indique dentro de la Comunidad de Madrid y en la fecha estipulada en la cláusula número 7 de este contrato, para su empaquetamiento en cajas de cartón con el logo del servicio Campus Box y su posterior distribución exclusivamente a estudiantes universitarios en España peninsular, con mayor enfoque en la Comunidad De Madrid, a través de correo postal, o bien a través de la recogida hecha personalmente por el estudiante en nuestras instalaciones. Dicho servicio pretende no tener coste alguno para el estudiante, exceptuando los costes de envío de la caja a través de correo postal en caso el estudiante optase por dicha forma de entrega. `;
      return campaignDataText;
    }
    if (TIPO_DE_CAMPANA.value === 'folletos') {
      campaignDataText = `El publicista se compromete, de ser requerido, a recoger ${UNIDADES_A_DISTRIBUIR.value} unidades de folletos publicitarios en el lugar que el cliente indique dentro de la Comunidad de Madrid y en la fecha estipulada en la cláusula número 7 de este contrato, para su empaquetamiento en cajas de cartón con el logo del servicio Campus Box y su posterior distribución exclusivamente a estudiantes universitarios en España peninsular, con mayor enfoque en la Comunidad De Madrid, a través de correo postal, o bien a través de la recogida hecha personalmente por el estudiante en nuestras instalaciones. Dicho servicio pretende no tener coste alguno para el estudiante, exceptuando los costes de envío de la caja a través de correo postal en caso el estudiante optase por dicha forma de entrega.`;
      return campaignDataText;
    }
    if (TIPO_DE_CAMPANA.value === 'merchandising') {
      campaignDataText = `El publicista se compromete, de ser requerido, a recoger ${UNIDADES_A_DISTRIBUIR.value} unidades del producto “${PRODUCTO.value}” en calidad de merchandising en el lugar que el cliente indique dentro de la Comunidad de Madrid y en la fecha estipulada en la cláusula número 7 de este contrato, para su empaquetamiento en cajas de cartón con el logo del servicio Campus Box y su posterior distribución exclusivamente a estudiantes universitarios en España peninsular, con mayor enfoque en la Comunidad De Madrid, a través de correo postal, o bien a través de la recogida hecha personalmente por el estudiante en nuestras instalaciones. Dicho servicio pretende no tener coste alguno para el estudiante, exceptuando los costes de envío de la caja a través de correo postal en caso el estudiante optase por dicha forma de entrega.`;
      return campaignDataText;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, error: null, submitLoading: true });
    const DATA = {
      cliente: {
        tipo: TIPO_DE_CLIENTE.value,
        texto_datos: createClientDataText(),
        actividad: ACTIVIDAD_CLIENTE.value,
        correo: CORREO_CLIENTE.value,
      },
      campana: {
        producto_a_promover: PRODUCTO_A_PROMOVER.value,
        tipo_de_campana: TIPO_DE_CAMPANA.value,
        texto_datos_campana: createCampaignDataText(),
      },
      contrato: {
        lugar_de_creacion: LUGAR_DE_CREACION.value,
        fecha_de_creacion: FECHA_DE_CREACION.value,
        periodo: PERIODO.value,
        fecha_inicio: dateToLetters.dateToLetterswithOutDay(
          INICIO_CONTRATO.value
        ),
        fecha_fin: dateToLetters.dateToLetterswithOutDay(FIN_CONTRATO.value),
        precio: PRECIO.value,
        precio_letras: PRECIO_LETRAS,
        modalidad_de_pago: MODALIDAD_DE_PAGO.value,
        fecha_pago_unico: dateToLetters.dateToLetterswithOutDay(
          FECHA_PAGO_UNICO.value
        ),
        valor_por_cuota: VALOR_POR_CUOTA,
        fecha_primera_cuota: dateToLetters.dateToLetterswithOutDay(
          FECHA_PRIMERA_CUOTA.value
        ),
        fecha_segunda_cuota: dateToLetters.monthAndYearOfDate(
          FECHA_SEGUNDA_CUOTA.value
        ),
        fecha_tercera_cuota: dateToLetters.monthAndYearOfDate(
          FECHA_TERCERA_CUOTA.value
        ),
        fecha_cuarta_cuota: dateToLetters.monthAndYearOfDate(
          FECHA_CUARTA_CUOTA.value
        ),
      },
    };

    try {
      //Creating pdf and storing on in server
      await fetch(endPoints.admin.createPdfContract, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DATA),
      });

      //Getting the generated pdf
      const response = await fetch(endPoints.admin.getPdfContract);
      const data = await response.blob();
      const pdfBlob = new Blob([data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'contrato.pdf');

      setState({
        ...state,
        submitLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        error: 'Error al generar contrato' + error.message,
        submitLoading: false,
      });
    }
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
          {/* /////////////////////////
                //   Lugar y fecha   //
              ///////////////////////// */}
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
                required
              />
            </div>

            <div>
              <label htmlFor='Fecha' className={`${styles.input_title}`}>
                Fecha de creación
              </label>
              <input
                required
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
                required
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

          {/* /////////////////////////
              //   Datos del cliente   //
            ///////////////////////// */}

          <h3>Datos del cliente</h3>
          <div className={styles.inputs_container}>
            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='juridica'
                name='tipo_cliente'
                value='juridica'
                checked={isClientTypeRadioSelected('juridica')}
                onChange={handleRadioClientTypeClick}
              />
              <label htmlFor='juridica'>Persona jurídica</label>
            </div>

            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='fisica'
                name='tipo_cliente'
                value='fisica'
                checked={isClientTypeRadioSelected('fisica')}
                onChange={handleRadioClientTypeClick}
              />
              <label htmlFor='fisica'>Persona física</label>
            </div>
          </div>

          <div className={styles.inputs_container}>
            {TIPO_DE_CLIENTE.value === 'juridica' ? (
              <>
                <div>
                  <label
                    htmlFor='nombre_cliente'
                    className={`${styles.input_title}`}
                  >
                    Nombre completo
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='nombre_cliente'
                    id='nombre_cliente'
                    type='text'
                    placeholder='Nombre completo'
                    autoComplete='off'
                    value={NOMBRE_CLIENTE.value}
                    onChange={NOMBRE_CLIENTE.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='direccion_cliente'
                    className={`${styles.input_title}`}
                  >
                    Dirección
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='direccion_cliente'
                    id='direccion_cliente'
                    type='text'
                    placeholder='Dirección'
                    autoComplete='off'
                    value={DIRECCION_CLIENTE.value}
                    onChange={DIRECCION_CLIENTE.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='dni' className={`${styles.input_title}`}>
                    DNI/NIF
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='dni'
                    id='dni'
                    type='text'
                    placeholder='DNI/NIF'
                    autoComplete='off'
                    value={DNI.value}
                    onChange={DNI.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='calidad' className={`${styles.input_title}`}>
                    En calidad de
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='calidad'
                    id='calidad'
                    type='text'
                    placeholder='En calidad de'
                    autoComplete='off'
                    value={EN_CALIDAD_DE.value}
                    onChange={EN_CALIDAD_DE.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='empresa_representada'
                    className={`${styles.input_title}`}
                  >
                    En representación de la empresa
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='empresa_representada'
                    id='empresa_representada'
                    type='text'
                    placeholder='En representación de la empresa'
                    autoComplete='off'
                    value={EMPRESA_REPRESENTADA.value}
                    onChange={EMPRESA_REPRESENTADA.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='domicilio_empresa'
                    className={`${styles.input_title}`}
                  >
                    Domicilio de la empresa
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='domicilio_empresa'
                    id='domicilio_empresa'
                    type='text'
                    placeholder='Domicilio de la empresa'
                    autoComplete='off'
                    value={DOMICILIO_EMPRESA.value}
                    onChange={DOMICILIO_EMPRESA.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='nif_empresa'
                    className={`${styles.input_title}`}
                  >
                    CIF/NIF de la empresa
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='nif_empresa'
                    id='nif_empresa'
                    type='text'
                    placeholder='CIF/NIF de la empresa'
                    autoComplete='off'
                    value={NIF.value}
                    onChange={NIF.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='lugar_registro_empresa'
                    className={`${styles.input_title}`}
                  >
                    Ciudad de registro de la empresa
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='lugar_registro_empresa'
                    id='lugar_registro_empresa'
                    type='text'
                    placeholder='Ciudad de registro de la empresa'
                    autoComplete='off'
                    value={LUGAR_REGISTRO_MERCANTIL.value}
                    onChange={LUGAR_REGISTRO_MERCANTIL.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='correo' className={`${styles.input_title}`}>
                    Corro de contacto
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='correo'
                    id='correo'
                    type='email'
                    placeholder='Corro de contacto'
                    autoComplete='off'
                    value={CORREO_CLIENTE.value}
                    onChange={CORREO_CLIENTE.onChange}
                    required
                  />
                </div>
              </>
            ) : TIPO_DE_CLIENTE.value === 'fisica' ? (
              <>
                <div>
                  <label
                    htmlFor='nombre_cliente'
                    className={`${styles.input_title}`}
                  >
                    Nombre completo
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='nombre_cliente'
                    id='nombre_cliente'
                    type='text'
                    placeholder='Nombre completo'
                    autoComplete='off'
                    value={NOMBRE_CLIENTE.value}
                    onChange={NOMBRE_CLIENTE.onChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='direccion_cliente'
                    className={`${styles.input_title}`}
                  >
                    Dirección
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='direccion_cliente'
                    id='direccion_cliente'
                    type='text'
                    placeholder='Dirección'
                    autoComplete='off'
                    value={DIRECCION_CLIENTE.value}
                    onChange={DIRECCION_CLIENTE.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='dni' className={`${styles.input_title}`}>
                    DNI/NIF
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='dni'
                    id='dni'
                    type='text'
                    placeholder='DNI/NIF'
                    autoComplete='off'
                    value={DNI.value}
                    onChange={DNI.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='correo' className={`${styles.input_title}`}>
                    Corro de contacto
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='correo'
                    id='correo'
                    type='email'
                    placeholder='Corro de contacto'
                    autoComplete='off'
                    value={CORREO_CLIENTE.value}
                    onChange={CORREO_CLIENTE.onChange}
                    required
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </div>

          {/* /////////////////////////
             // Actividad del cliente //
              ///////////////////////// */}
          <h3>Actividad del cliente</h3>
          <div className={styles.inputs_container}>
            <div>
              <label
                htmlFor='actividad_cliente'
                className={`${styles.input_title}`}
              >
                Actividad del cliente
              </label>
              <input
                className={`${styles.input}`}
                name='actividad_cliente'
                id='actividad_cliente'
                type='text'
                placeholder='Actividad del cliente'
                autoComplete='off'
                value={ACTIVIDAD_CLIENTE.value}
                onChange={ACTIVIDAD_CLIENTE.onChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor='producto_a_promover'
                className={`${styles.input_title}`}
              >
                Producto a promover
              </label>
              <input
                className={`${styles.input}`}
                name='producto_a_promover'
                id='producto_a_promover'
                type='text'
                placeholder='Producto a promover'
                autoComplete='off'
                value={PRODUCTO_A_PROMOVER.value}
                onChange={PRODUCTO_A_PROMOVER.onChange}
                required
              />
            </div>
          </div>

          {/* /////////////////////////
             // Actividad del cliente //
              ///////////////////////// */}

          <h3>Características de la campaña publicitaria</h3>

          <div className={styles.flex_inputs_container}>
            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='producto'
                name='tipo_campana'
                value='producto'
                checked={isCampaignTypeRadioSelected('producto')}
                onChange={handleRadioCampaignTypeClick}
              />
              <label htmlFor='producto'>Producto</label>
            </div>

            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='folletos'
                name='tipo_campana'
                value='folletos'
                checked={isCampaignTypeRadioSelected('folletos')}
                onChange={handleRadioCampaignTypeClick}
              />
              <label htmlFor='folletos'>Folletos</label>
            </div>

            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='merchandising'
                name='tipo_campana'
                value='merchandising'
                checked={isCampaignTypeRadioSelected('merchandising')}
                onChange={handleRadioCampaignTypeClick}
              />
              <label htmlFor='merchandising'>Merchandising</label>
            </div>
          </div>

          <div className={styles.inputs_container}>
            {TIPO_DE_CAMPANA.value === 'producto' ? (
              <>
                <div>
                  <label
                    htmlFor='nombre_producto'
                    className={`${styles.input_title}`}
                  >
                    Nombre del producto
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='nombre_producto'
                    id='nombre_producto'
                    type='text'
                    placeholder='Nombre del producto'
                    autoComplete='off'
                    value={PRODUCTO.value}
                    onChange={PRODUCTO.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='marca' className={`${styles.input_title}`}>
                    Marca
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='marca'
                    id='marca'
                    type='text'
                    placeholder='Marca'
                    autoComplete='off'
                    value={MARCA.value}
                    onChange={MARCA.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='unidades' className={`${styles.input_title}`}>
                    Unidades a distribuir
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='unidades'
                    id='unidades'
                    type='number'
                    placeholder='Unidades a distribuir'
                    autoComplete='off'
                    value={UNIDADES_A_DISTRIBUIR.value}
                    onChange={UNIDADES_A_DISTRIBUIR.onChange}
                    required
                  />
                </div>
              </>
            ) : TIPO_DE_CAMPANA.value === 'folletos' ? (
              <>
                <div>
                  <label htmlFor='unidades' className={`${styles.input_title}`}>
                    Unidades a distribuir
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='unidades'
                    id='unidades'
                    type='number'
                    placeholder='Unidades a distribuir'
                    autoComplete='off'
                    value={UNIDADES_A_DISTRIBUIR.value}
                    onChange={UNIDADES_A_DISTRIBUIR.onChange}
                    required
                  />
                </div>
              </>
            ) : TIPO_DE_CAMPANA.value === 'merchandising' ? (
              <>
                <div>
                  <label
                    htmlFor='nombre_producto'
                    className={`${styles.input_title}`}
                  >
                    Nombre del producto
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='nombre_producto'
                    id='nombre_producto'
                    type='text'
                    placeholder='Nombre del producto'
                    autoComplete='off'
                    value={PRODUCTO.value}
                    onChange={PRODUCTO.onChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor='unidades' className={`${styles.input_title}`}>
                    Unidades a distribuir
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='unidades'
                    id='unidades'
                    type='number'
                    placeholder='Unidades a distribuir'
                    autoComplete='off'
                    value={UNIDADES_A_DISTRIBUIR.value}
                    onChange={UNIDADES_A_DISTRIBUIR.onChange}
                    required
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </div>

          {/* /////////////////////////
             // Fechas del contrato //
              ///////////////////////// */}

          <h3>Fechas del contrato</h3>

          <div className={styles.inputs_container}>
            <div>
              <label
                htmlFor='inicio_contrato'
                className={`${styles.input_title}`}
              >
                Fecha de inicio del contrato
              </label>
              <input
                className={`${styles.input}`}
                name='inicio_contrato'
                id='inicio_contrato'
                type='date'
                placeholder='Fecha de inicio del contrato'
                autoComplete='off'
                value={INICIO_CONTRATO.value}
                onChange={INICIO_CONTRATO.onChange}
                required
              />
            </div>

            <div>
              <label htmlFor='fin_contrato' className={`${styles.input_title}`}>
                Fecha de fin del contrato
              </label>
              <input
                className={`${styles.input}`}
                name='fin_contrato'
                id='fin_contrato'
                type='date'
                placeholder='Fecha de fin del contrato'
                autoComplete='off'
                value={FIN_CONTRATO.value}
                onChange={FIN_CONTRATO.onChange}
                required
              />
            </div>
          </div>

          {/* /////////////////////////
             // Precio y forma de pago //
              ///////////////////////// */}

          <h3>Precio y forma de pago</h3>
          <div className={styles.inputs_container}>
            <div>
              <label htmlFor='precio' className={`${styles.input_title}`}>
                Precio total sin IVA
              </label>
              <input
                className={`${styles.input}`}
                name='precio'
                id='precio'
                type='number'
                placeholder='Precio total sin IVA'
                autoComplete='off'
                value={PRECIO.value}
                onChange={PRECIO.onChange}
                required
              />
            </div>

            <div className={styles.info_displayer}>{PRECIO_LETRAS}</div>
          </div>

          <div className={styles.inputs_container}>
            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='pago_unico'
                name='forma_pago'
                value='pago_unico'
                checked={isWayToPayRadioSelected('pago_unico')}
                onChange={handleRadioWayToPayClick}
              />
              <label htmlFor='pago_unico'>Pago único</label>
            </div>

            <div className={styles.radio_input_container}>
              <input
                required
                className={styles.radio_input}
                type='radio'
                id='pago_cuotas'
                name='forma_pago'
                value='pago_cuotas'
                checked={isWayToPayRadioSelected('pago_cuotas')}
                onChange={handleRadioWayToPayClick}
              />
              <label htmlFor='pago_cuotas'>Pago en 4 cuotas</label>
            </div>
          </div>

          <div className={styles.inputs_container}>
            {MODALIDAD_DE_PAGO.value === 'pago_unico' ? (
              <>
                <div>
                  <label
                    htmlFor='fecha_limite_pago'
                    className={`${styles.input_title}`}
                  >
                    Fecha límite de pago
                  </label>
                  <input
                    className={`${styles.input}`}
                    name='fecha_limite_pago'
                    id='fecha_limite_pago'
                    type='date'
                    placeholder='Fecha límite de pago'
                    autoComplete='off'
                    value={FECHA_PAGO_UNICO.value}
                    onChange={FECHA_PAGO_UNICO.onChange}
                    required
                  />
                </div>
              </>
            ) : MODALIDAD_DE_PAGO.value === 'pago_cuotas' ? (
              <>
                <div>
                  <div>
                    <label
                      htmlFor='primer_pago'
                      className={`${styles.input_title}`}
                    >
                      Fecha primer pago
                    </label>
                    <input
                      className={`${styles.input}`}
                      name='primer_pago'
                      id='primer_pago'
                      type='date'
                      placeholder='Fecha primer pago'
                      autoComplete='off'
                      value={FECHA_PRIMERA_CUOTA.value}
                      onChange={FECHA_PRIMERA_CUOTA.onChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='segundo_pago'
                      className={`${styles.input_title}`}
                    >
                      Fecha segundo pago
                    </label>
                    <input
                      className={`${styles.input}`}
                      name='segundo_pago'
                      id='segundo_pago'
                      type='date'
                      placeholder='Fecha segundo pago'
                      autoComplete='off'
                      value={FECHA_SEGUNDA_CUOTA.value}
                      onChange={FECHA_SEGUNDA_CUOTA.onChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='tercer_pago'
                      className={`${styles.input_title}`}
                    >
                      Fecha tercer pago
                    </label>
                    <input
                      className={`${styles.input}`}
                      name='tercer_pago'
                      id='tercer_pago'
                      type='date'
                      placeholder='Fecha tercer pago'
                      autoComplete='off'
                      value={FECHA_TERCERA_CUOTA.value}
                      onChange={FECHA_TERCERA_CUOTA.onChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='cuarto_pago'
                      className={`${styles.input_title}`}
                    >
                      Fecha cuarto pago
                    </label>
                    <input
                      className={`${styles.input}`}
                      name='cuarto_pago'
                      id='cuarto_pago'
                      type='date'
                      placeholder='Fecha cuarto pago'
                      autoComplete='off'
                      value={FECHA_CUARTA_CUOTA.value}
                      onChange={FECHA_CUARTA_CUOTA.onChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <p className={styles.fake_label}>Valor de cada cuota</p>
                  <div className={styles.info_displayer}>{VALOR_POR_CUOTA}</div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>

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
