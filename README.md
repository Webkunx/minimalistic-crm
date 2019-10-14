### README.MD

------------

#### To Start server:
- put into your console ` npm install` , it will install all node-modules for project
- after you installed all node-modules, put into console `npm start` , your server will be started on 3000 port by default
- then you can open your browser and go to `localhost:3000` and take a look on the project

------------



#### History
- Added **Log in** and **Register**, based on **MongoDB**, **passport.js** and **express.js**. For Front-End part now is used **e.js**


------------


#### Possible future changes
##### Major changes: 
- **Ajax**
- **React.js** as main Front-End module
- **MySQL** handler and Front-End part for this
- Change Auth strategy, now is used local-strategy, will be replaced with **JWT**

##### Minor changes:
- ~~Rename dir ./rountes to ./routes~~
- Add node-config module
- Create controllers and move buisness logic inside
- Separate all into different modules: Config, User, Auth, etc..
- ~~Create ./src folder with code and ./assets or ./public for static ( favicon, css, images etc)~~
- Auth with social networks: fb and google - create a factory method for login
- Add some unit tests using Mocha, Chai
- put some coverage with Istanbul

