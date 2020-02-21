/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // data routes
  'get /api/samples': { controller: 'Data', action: 'index', skipAssets: true },
  'post /api/samples': { controller: 'Data', action: 'create', skipAssets: true },
  'put /api/samples': { controller: 'Data', action: 'update', skipAssets: true },
  'delete /api/samples': { controller: 'Data', action: 'delete', skipAssets: true },

    // rules routes
  'get /api/rules': { controller: 'Rule', action: 'index', skipAssets: true },
  'post /api/rules': { controller: 'Rule', action: 'create', skipAssets: true },
  'put /api/rules': { controller: 'Rule', action: 'update', skipAssets: true },
  'delete /api/rules': { controller: 'Rule', action: 'delete', skipAssets: true },

  // rules execution
  'get /api/process/:ruleId': { controller: 'Process', action: 'index', skipAssets: true }


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
