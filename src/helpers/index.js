const paginate = (page, pageSize) => ({
  offset: page * pageSize,
  limit: page * pageSize + pageSize,
});

module.exports = {
  paginate,
};
