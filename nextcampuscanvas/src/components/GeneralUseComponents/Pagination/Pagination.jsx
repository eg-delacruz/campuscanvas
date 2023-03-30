//Styles
import styles from './Pagination.module.scss';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalItems / itemsPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={styles.arrow_left}>
          <button
            type='button'
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.pageLink} ${
              currentPage === 1 ? styles.disabled : ''
            }`}
          >
            ⬅️
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              type='button'
              onClick={() => paginate(number)}
              className={`${styles.pageLink} ${
                currentPage === number ? styles.active : ''
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={styles.arrow_right}>
          <button
            type='button'
            onClick={() => paginate(currentPage + 1)}
            className={`${styles.pageLink} ${
              currentPage === pageNumbers.length ? styles.disabled : ''
            }`}
            disabled={currentPage === pageNumbers.length}
          >
            ➡️
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
