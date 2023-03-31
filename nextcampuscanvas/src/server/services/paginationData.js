//Pagination as seen in:
//https://www.youtube.com/watch?v=ZX3qt0UWifc&list=WL&index=30

//This function is used to paginate the results of a mongo query. It returns an object with the pagination data to be used to get the paginated results
export default function paginationData(totalEntries, page, limit) {
  const PAGE = parseInt(page);
  const LIMIT = parseInt(limit);

  const startIndex = (PAGE - 1) * LIMIT;
  const endIndex = PAGE * LIMIT;
  const next =
    endIndex < totalEntries ? { PAGE: PAGE + 1, LIMIT: LIMIT } : null;
  const previous = startIndex > 0 ? { PAGE: PAGE - 1, LIMIT: LIMIT } : null;

  const pagination_data = {
    LIMIT,
    startIndex,
    next,
    previous,
  };

  return pagination_data;
}
