import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Styles
import styles from './BrandsWithNoDiscountsTable.module.scss';

//Request functions
import requestFn from '@request-functions/Admin/Discounts';

//Services
import dateFormat from '@services/dateFormat';

//Assets
import update_icon from '@assets/GeneralUse/IconsAndButtons/update.svg';

//Components
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';
import DisplayUpdateLastTimeCheckedModal from '../Descuentos/Brands/DisplayUpdateLastTimeCheckedModal/DisplayUpdateLastTimeCheckedModal';

const BrandsWithNoDiscountsTable = () => {
  //States

  const [showUpdateLastTimeCheckedModal, setShowUpdateLastTimeCheckedModal] =
    useState(false);
  const [brandInfo, setBrandInfo] = useState({
    brand_id: '',
    brand_name: '',
  });

  //React query
  const BRANDS = useQuery({
    queryKey: [adminKeys.brands.all_brands],
    queryFn: requestFn.getBrands,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
    initialData: [],
    initialDataUpdatedAt: 1, //prevent initialData from being overwritten by queryFn
  });

  //Get brands with no discounts
  const brandsWithNoDiscounts = BRANDS.data?.filter(
    (brand) => brand.discounts_attached === 0
  );

  //Order brands from oldest to newest using according to last_time_checked_since_brand_has_no_discounts property
  const orderedBrands = brandsWithNoDiscounts?.sort((a, b) => {
    return (
      new Date(a.last_time_checked_since_brand_has_no_discounts) -
      new Date(b.last_time_checked_since_brand_has_no_discounts)
    );
  });

  //Functions

  //Check if JS date is older than 1 month and return true or false
  function checkIfOlderThanOneMonth(date) {
    const dateToCheck = new Date(date);
    const today = new Date();

    const oneMonth = 1000 * 60 * 60 * 24 * 30;

    const difference = today - dateToCheck;

    if (difference > oneMonth) {
      return true;
    } else {
      return false;
    }
  }

  //Check if JS date is oder than 2 months and return true or false
  function checkIfOlderThanTwoMonths(date) {
    const dateToCheck = new Date(date);
    const today = new Date();

    const twoMonths = 1000 * 60 * 60 * 24 * 30 * 2;

    const difference = today - dateToCheck;

    if (difference > twoMonths) {
      return true;
    } else {
      return false;
    }
  }

  function setBrandDateForUpdateModal(brand_id, brand_name) {
    setBrandInfo({ brand_id, brand_name });
    setShowUpdateLastTimeCheckedModal(true);
  }
  function handleDisplayUpdateLastTimeCheckedDate() {
    return (
      <DisplayUpdateLastTimeCheckedModal
        showModal={showUpdateLastTimeCheckedModal}
        setShowModal={setShowUpdateLastTimeCheckedModal}
        brand_id={brandInfo.brand_id}
        brand_name={brandInfo.brand_name}
      />
    );
  }

  if (BRANDS.isLoading || BRANDS.isFetching)
    return (
      <div className={styles.loader_container}>
        <div className={styles.cc_logo}>
          <CC_LogoLoader />
        </div>
      </div>
    );

  if (BRANDS.isError)
    return <p className='error__message'>{BRANDS.error?.message}</p>;

  return (
    <>
      {handleDisplayUpdateLastTimeCheckedDate()}
      <div className={styles.container}>
        <h4 className={styles.title}>Marcas sin descuentos asociados</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.encabezado_col1}>
                Actualizar fecha revisión
              </th>
              <th>Marca</th>
              <th>Programa de afiliación</th>
              <th>Última fecha de revisión</th>
            </tr>
          </thead>

          <tbody>
            {orderedBrands?.map((brand) => (
              <tr key={brand._id}>
                <td className={styles.col1}>
                  <Image
                    className={styles.update_icon}
                    width={16}
                    height={16}
                    src={update_icon}
                    alt='update icon'
                    onClick={() => {
                      setBrandDateForUpdateModal(brand._id, brand.brand_name);
                    }}
                  />
                </td>
                <td>
                  <Link
                    href={`/admin/descuentos/gestionar-marcas/editar-marca/${brand._id}`}
                  >
                    {brand.brand_name}
                  </Link>
                </td>
                <td>{brand.affiliate_program}</td>
                <td className={styles.col4}>
                  <span
                    className={`${
                      checkIfOlderThanOneMonth(
                        new Date(
                          brand.last_time_checked_since_brand_has_no_discounts
                        )
                      )
                        ? styles.warn_background
                        : ''
                    } ${
                      checkIfOlderThanTwoMonths(
                        new Date(
                          brand.last_time_checked_since_brand_has_no_discounts
                        )
                      )
                        ? styles.danger_background
                        : ''
                    }`}
                  >
                    {dateFormat.dateToDMYHM(
                      new Date(
                        brand.last_time_checked_since_brand_has_no_discounts
                      )
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BrandsWithNoDiscountsTable;
