import { useState, useEffect } from 'react';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';
import HorizontalBarChart from '@components/UsedInSpecificRoutes/Admin/HorizontalBarChart/HorizontalBarChart';
import BrandsWithNoDiscountsTable from '@components/UsedInSpecificRoutes/Admin/BrandsWithNoDiscountsTable/BrandsWithNoDiscountsTable';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Styles
import styles from '@pagestyles/admin/admin.module.scss';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Data request functions
import requestFunctions from '@request-functions/Admin/Discounts/index';

const index = () => {
  const { securingRoute } = useSecureAdminRoute();

  const [preparingData, setPreparingData] = useState(true);

  const [mostLikedData, setMostLikedData] = useState({
    labels: [],
    dataset: [],
  });
  const [mostDislikedData, setMostDislikedData] = useState({
    labels: [],
    dataset: [],
  });

  //React query
  const MOST_LIKED_DISCOUNTS_DATA = useQuery({
    queryKey: [adminKeys.discounts.most_liked_discounts_data],
    queryFn: requestFunctions.getMostLikedDiscounts,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const MOST_DISLIKED_DISCOUNTS_DATA = useQuery({
    queryKey: [adminKeys.discounts.most_disliked_discounts_data],
    queryFn: requestFunctions.getMostDislikedDiscounts,
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (
      !MOST_LIKED_DISCOUNTS_DATA.isLoading &&
      !MOST_DISLIKED_DISCOUNTS_DATA.isLoading
    ) {
      setLikedDislikedData();
    }
  }, [
    MOST_DISLIKED_DISCOUNTS_DATA.isLoading,
    MOST_LIKED_DISCOUNTS_DATA.isLoading,
  ]);

  //Functions
  const setLikedDislikedData = () => {
    setMostLikedData({
      labels: MOST_LIKED_DISCOUNTS_DATA.data?.map(
        (discount) => discount.title + ' | ' + discount.brand.brand_name
      ),
      dataset: MOST_LIKED_DISCOUNTS_DATA.data?.map(
        (discount) => discount.likes
      ),
    });

    setMostDislikedData({
      labels: MOST_DISLIKED_DISCOUNTS_DATA.data?.map(
        (discount) => discount.title + ' | ' + discount.brand.brand_name
      ),
      dataset: MOST_DISLIKED_DISCOUNTS_DATA.data?.map(
        (discount) => discount.dislikes
      ),
    });

    setPreparingData(false);
  };

  const likedData = {
    labels: mostLikedData.labels,
    datasets: [
      {
        label: 'Likes',
        data: mostLikedData.dataset,
        backgroundColor: ['#005ef5'],
        borderColor: ['#005ef5'],
        borderWidth: 1,
      },
    ],
  };

  const dislikedData = {
    labels: mostDislikedData.labels,
    datasets: [
      {
        label: 'Dislikes',
        data: mostDislikedData.dataset,
        backgroundColor: ['#ad2146'],
        borderColor: ['#ad2146'],
        borderWidth: 1,
      },
    ],
  };

  if (securingRoute) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.background}>
        <AdminHeader />
        <div className={`${styles.container} container`}>
          <h1>Dashboard</h1>
          <div className={styles.charts_container}>
            {/* /////////////////////////
            //  Liked/disliked charts  //
            ///////////////////////// */}
            <div className={styles.liked_disliked_charts_container}>
              {preparingData ? (
                <div className={styles.chart_loader}>
                  <div className={styles.CC_logo}>
                    <CC_LogoLoader />
                  </div>
                </div>
              ) : (
                <div className={styles.chart_container}>
                  <HorizontalBarChart
                    title={'Descuentos más gustados actualmente'}
                    chartData={likedData}
                  />
                </div>
              )}

              {preparingData ? (
                <div className={styles.chart_loader}>
                  <div className={styles.CC_logo}>
                    <CC_LogoLoader />
                  </div>
                </div>
              ) : (
                <div className={styles.chart_container}>
                  <HorizontalBarChart
                    title={'Descuentos menos gustados actualmente'}
                    chartData={dislikedData}
                  />
                </div>
              )}
            </div>

            {/* ////////////////////////////////
            // Brands with no discounts table //
            ////////////////////////////////// */}

            <div className={styles.brands_with_no_discounts_container}>
              <BrandsWithNoDiscountsTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
