//Styles
import styles from './VerifyedStudentsCount.module.scss';

//React query
import { useQuery } from '@tanstack/react-query';
import adminKeys from '@query-key-factory/adminKeys';

//Request functions
import adminFunctions from '@request-functions/Admin/Students';

//Components
import CC_LogoLoader from '@components/GeneralUseComponents/CC_LogoLoader/CC_LogoLoader';

const VerifyedStudentsCount = () => {
  //React query
  const STUDENTS_COUNT = useQuery({
    queryKey: [adminKeys.students.get_verified_students_count],
    queryFn: adminFunctions.getVerifiedStudentsCount,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });

  if (STUDENTS_COUNT.isLoading || STUDENTS_COUNT.isFetching)
    return (
      <div className={styles.loader_container}>
        <div className={styles.cc_logo}>
          <CC_LogoLoader />
        </div>
      </div>
    );

  if (STUDENTS_COUNT.isError)
    return <p className='error__message'>{STUDENTS_COUNT.error?.message}</p>;

  return (
    <div className={styles.container}>
      <h4>Estudiantes verificados</h4>
      <div className={styles.count_container}>
        <p>{STUDENTS_COUNT.data}</p>
      </div>
    </div>
  );
};

export default VerifyedStudentsCount;
