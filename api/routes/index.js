let allRoutes = [require('./user.routes')];

module.exports = (app) => {
  for (let routes of allRoutes) {
    routes(app);
  }
};
