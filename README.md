# briskbuy.com

* Its a basic e-commerce web-app developed on node js.
* Searching of a product has been provided using regexp (regular expression)
* The application has login/signup while maintaining sessions and is authenticated by passport local strategy.
* It consists of 2 views.     
  1. one for the vendor at ‘/vendors’ for adding products. link https://briskbuy.herokuapp.com/vendors
  2. Second for the users to view and buy products. link: https://briskbuy.herokuapp.com
* It is equipped with stock maintenance while maintaining transactions.
* The application is a fast web app as it uses ajax for request exchange and hence no unnecessary reloads.
* Frameworks used: 
  1. express - for running servers
  2. sequelize - for object relational mapping
  3. hbs - view engine
  4. mysql2 / pg  - for mysql and postgresql database respectively (used mysql while development while pg for deployment)
* It involves following libraries:
  1. bootstrap - CSS library
  2. jQuery - javascript library
* It is deployed over https://briskbuy.herokuapp.com
