# Abersoft test

Step by step to running this apps : 
* first make sure you have all dependencies (postgres, node, yarn or npm, nodemon) and change .env.example file name to .env
* second clone this repository with command : 
  ```console
   git clone https://github.com/anfedu/abersoft.git
  ```
* third move into repository folder with command 
  ```console
   cd abersoft
  ```
* fourth install all nodejs library with command 
  ```console
   yarn
  ```
* fifth create database with command  
  ```console
  npx sequelize db:create
  ```
* sixth migrate database with command  
  ```console
  npx sequelize db:migrate
  ```
* seventh running application with command  
  ```console
  yarn server
  ```
