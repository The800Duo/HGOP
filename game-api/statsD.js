module.exports = (context) => {
  const StatsD = context('hotshots');
  return new StatsD({
    host: 'dog_container',
  });
};
