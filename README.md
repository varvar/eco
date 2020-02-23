# EcoPlant Test

### Description

Please note, that project is for demo purpose only, all validations are very basic and authentication is missing.
Try to not insert unwanted values to DB.

+ CRUD for rules located in /api/RuleController.js
+ CRUD for samples located in /api/DataController.js
+ Rules evaluation logic is in /api/ProcessController.js
+ Bonus ETL queries logic is in /api/EtlController.js

### Installation 

+ cd to the folder you want to install the project
+ Be sure you have nodejs and git installed on your computer.
+ git clone https://github.com/varvar/ecoPlant.git
+ cd to ecoPlant folder
+ npm install
+ npm start
+ Once app is started all API's will be availiable.
+ API and app are listening to port 1337 and availiable on http://localhost:1337


### API documentation

All API calls and documentation are here:

https://documenter.getpostman.com/view/2035283/SzKVPxB1?version=latest.

Api documentation generated by postman application and can be easily converted to postman collection.


### Database structure

Database used in the project is MySql. Database structure for inspection located in file db_struct.sql in root folder. Project connected to real database located on cloud. Access to DB can be provided by request.


### Bonus section

Bonus section developed for pressure sample only. Other samples like temperature and volume can be added with same logic if needed. ETL API depends on pressure samples existing in database. Pressure samples should be inserted in the last hour with interval of 1 minute each.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

