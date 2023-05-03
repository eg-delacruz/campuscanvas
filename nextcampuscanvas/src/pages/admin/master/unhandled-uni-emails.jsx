//Styles
import styles from '@pagestyles/admin/master/unhandled-uni-emails.module.scss';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Data requests
import adminFunctions from '@request-functions/Admin/Students';

//Services
import dateFormat from '@services/dateFormat';

const index = () => {
  const { securingRoute } = useSecureAdminRoute('master');

  //React query
  const UNHANDLED_UNI_EMAILS = useQuery({
    queryKey: [adminKeys.students.unhandled_stu_emails_list],
    queryFn: adminFunctions.getUnhandledStuEmails,
    staleTime: Infinity,
  });

  //Order data alphabetically by entry.university attribute of each object
  const orderedData = UNHANDLED_UNI_EMAILS.data?.sort((a, b) =>
    a.university.localeCompare(b.university)
  );

  if (
    securingRoute ||
    UNHANDLED_UNI_EMAILS.isLoading ||
    UNHANDLED_UNI_EMAILS.isFetching
  ) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className={`${styles.container} container`}>
        <h1>Correos de universidades no controlados</h1>

        <p>
          Una vez haya como mínimo 10 registros por universidad, corregir esto
          en código y eliminar estos registros manualmente en DB, pues no merece
          la pena crear todo un endpoint para eso.
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Universidad</th>
              <th>Email</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>

          <tbody>
            {orderedData?.map((entry, index) => {
              let isEqual;
              if (entry.university === orderedData[index + 1]?.university)
                isEqual = true;
              else isEqual = false;

              return (
                <tr
                  key={entry._id}
                  className={`${!isEqual ? styles.bottom_border : ''}`}
                >
                  <td>{index + 1}</td>
                  <td>{entry.university}</td>
                  <td>{entry.stu_email}</td>
                  <td>{dateFormat.dateToDMYHM(new Date(entry.createdAt))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default index;
