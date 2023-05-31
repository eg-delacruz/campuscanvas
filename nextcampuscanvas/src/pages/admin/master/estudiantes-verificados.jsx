//Syles
import styles from '@pagestyles/admin/master/EstudiantesVerificados.module.scss';

//React query
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Components
import AdminHeader from '@components/UsedInSpecificRoutes/Admin/AdminHeader/AdminHeader';
import Loader from '@components/GeneralUseComponents/Loader/Loader';

//hooks
import useSecureAdminRoute from '@hooks/useSecureAdminRoute';

//Request functions
import adminFunctions from '@request-functions/Admin/Students';

//Services
import dateFormat from '@services/dateFormat';

const estudiantesVerificados = () => {
  const { securingRoute } = useSecureAdminRoute('master');

  const LIMIT = 20;

  //React query
  const STUDENTS_COUNT = useQuery({
    queryKey: [adminKeys.students.get_verified_students_count],
    queryFn: adminFunctions.getVerifiedStudentsCount,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });

  const STUDENTS_PAGINATION = useInfiniteQuery({
    queryKey: [adminKeys.students.get_verified_students],
    queryFn: ({ pageParam = 1 }) =>
      adminFunctions.getVerifiedStudents({
        page: pageParam,
        limit: LIMIT,
      }),
    //We set here the pageParam to get the next page
    getNextPageParam: (lastPage) => lastPage?.next?.PAGE,
  });

  const STUDENTS = STUDENTS_PAGINATION.data?.pages?.flatMap(
    (page) => page.students
  );

  if (securingRoute || STUDENTS_PAGINATION.isLoading) {
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
        <h1>Estudiantes verificados ({STUDENTS_COUNT?.data})</h1>

        <p>Orden de más antiguo a más reciente</p>

        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Género</th>
                <th>Correo</th>
                <th>Uni-email</th>
                <th>ID estudiante</th>
                <th>Universidad</th>
                <th>Facultad</th>
                <th>Fecha de registro</th>
              </tr>
            </thead>

            <tbody>
              {STUDENTS?.map((student, index) => {
                return (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.nickname}</td>
                    <td className={styles.row3}>{student.gender}</td>
                    <td>{student.email}</td>
                    <td>{student.stu_email}</td>
                    <td>{student.stu_id}</td>
                    <td>{student.stu_data.university}</td>
                    <td>{student.stu_data.faculty}</td>
                    <td>{dateFormat.dateToYMD(new Date(student.createdAt))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {STUDENTS_PAGINATION.hasNextPage && (
          <button
            onClick={() => STUDENTS_PAGINATION.fetchNextPage()}
            className={`${styles.show_more_btn} btn button--red ${
              STUDENTS_PAGINATION.isFetchingNextPage && styles.buttonLoading
            }`}
            disabled={STUDENTS_PAGINATION.isFetchingNextPage}
          >
            Mostrar más
          </button>
        )}
      </div>
    </>
  );
};

export default estudiantesVerificados;
