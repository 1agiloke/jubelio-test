# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* This is a repository for Jubelio Fullstack Test Result
* Including React UI, Laravel UI and Backend source code


### How do I get set up? ###
#### Pre-requirements ####
* [Node JS](https://nodejs.org/en/download/)
* [React](https://reactjs.org/)
* [PostgresSQL](https://www.postgresql.org/)
* [Composer](https://getcomposer.org/)
* [Laravel](https://laravel.com/)
#### Backend ####
* Ensure PostgresSQL is running
* Move to `eleveniabe` directory
* Fill DB settings, 3rd Party URL Endpoint and credential accordingly
* run `npm install`
* run `node scripts/generateAppToken.js` to get **API_KEY**
* run `node scripts/refreshAndMigrateProducts.js` to get refresh and table then migrate products from Elevenia API
* run `node index.js`

#### React UI ####
* Move to `eleveniareact` directory
* Add `env` file on the root of `eleveniareact` directory
* Fill URL Endpoint and credential accordingly. 
* **API_URL** refer to your running `backend` address.
* Ensure **API_KEY** filled with the generated API_KEY from **generateAppToken** script
* run `npm install`
* run `npm run start`

#### Laravel UI ####
* Move to `elevenialara` directory
* Add `env` file on the root of `elevenialara` directory
* Fill URL Endpoint and credential accordingly. 
* **API_URL** refer to your running `backend` address.
* Ensure **API_KEY** filled with the generated API_KEY from **generateAppToken** script
* run `composer install`
* run `npm install`
* run `npm run dev`
* run `php artisan serve`

#### Notes ####
* If you prefer to serve the UI projects on different ports, you need to whitelist the origin on the `eleveniabe` configs on the *WHITELISTED_ORIGINS* section

