//data, all the entries to paginate
// limit, max number of entries per page,
// page, current page selected
const pagination = (data, limit, page) => {
  limit = Number(limit);
  page = page ? Number(page) : 1;
  const results = {};
  const math = Math.ceil(data.length / limit);
  const maxPage = math <= 0 ? 1 : math;
  let sliced;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // if page provided is > than the total of pages, return last page
  if (endIndex >= data.length) {
    results.next = {
      page: maxPage <= 0 ? 1 : maxPage,
      limit,
    };

    results.previous = {
      page: maxPage - 1 <= 0 ? 1 : maxPage - 1,
      limit,
    };

    sliced = data.slice((maxPage - 1) * limit, maxPage * limit);
  } else {
    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    // endIndex is more than total of pages, return previous, else return same page;
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    } else {
      results.previous = {
        page: page,
        limit,
      };
    }

    sliced = data.slice(startIndex, endIndex);
  }

  return {
    ...results,
    maxPage,
    products: [...sliced],
  };
};

module.exports = pagination;
