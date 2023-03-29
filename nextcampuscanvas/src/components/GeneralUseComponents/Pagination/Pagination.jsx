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
      </ul>
    </nav>
  );
};

export default Pagination;
