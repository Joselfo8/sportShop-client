function paginate(maxPage, currentPage = 1, pageSize = 10, pagesToShow = 10) {
  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > maxPage) {
    currentPage = maxPage;
  }

  let startPage, endPage;
  if (maxPage <= pagesToShow) {
    // max pages less than max so show all pages
    startPage = 1;
    endPage = maxPage;
  } else {
    // max pages more than max so calculate start and end pages
    let pagesToShowBeforeCurrentPage = Math.floor(pagesToShow / 2);
    let pagesToShowAfterCurrentPage = Math.ceil(pagesToShow / 2) - 1;
    if (currentPage <= pagesToShowBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + pagesToShowAfterCurrentPage >= maxPage) {
      // current page near the end
      startPage = maxPage - pagesToShow + 1;
      endPage = maxPage;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - pagesToShowBeforeCurrentPage;
      endPage = currentPage + pagesToShowAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, maxPage - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  // return object with all pager properties required by the view
  return {
    maxPage,
    currentPage,
    pageSize,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
}

export default paginate;
