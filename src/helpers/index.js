const paginate = (page, pageSize) => ({
  offset: page * pageSize,
  limit: pageSize,
});

module.exports = {
  paginate,
};
