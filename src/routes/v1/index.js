const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const collectionroute = require('./collection.route');
const config = require('../../config/config');
const teamRoute = require('./team.route');
const approxRoute = require('./approx.route');
const locationRoute = require('./location.route');
const uploadFileRoute = require('./uploadFiles.route');
const loginRoute = require('./login.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/team',
    route: teamRoute,
  },
  {
    path: '/collection',
    route: collectionroute,
  },
  {
    path: '/approx',
    route: approxRoute,
  },
  {
    path: '/location',
    route: locationRoute,
  },
  {
    path: '/fileserver',
    route: uploadFileRoute,
  },
  {
    path: '/login',
    route: loginRoute,
  },
  {
    path: '/web',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
