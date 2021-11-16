export function usePagination(emit) {
  const handlePaginationSizeChange = function (pageSize) {
    emit('pagination-size-change', pageSize)
  }
  const handlePaginationCurrentChange = function (currentPage) {
    emit('pagination-current-change', currentPage)
  }
  const handlePaginationPrevClick = function (currentPage) {
    emit('pagination-prev-click', currentPage)
  }
  const handlePaginationNextClick = function (currentPage) {
    emit('pagination-next-click', currentPage)
  }
  return {
    handlePaginationSizeChange,
    handlePaginationCurrentChange,
    handlePaginationPrevClick,
    handlePaginationNextClick
  }
}
