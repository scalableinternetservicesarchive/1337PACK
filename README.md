### **Orchestration**

##### Get PG up and running
```
docker run postgres  
docker-compose build web  
docker-compose run web rails new . --no-deps --database postgres  
```  

While debugging, if you encounter PSQL issues, it doesn't mean you wait for the server
to come up each time before you hit the issue. Instead, try to create the DB -   

`docker-compose run web rails db:create`

This creates the database: app_developement and app_test - this is needed to run the app
Make sure to add `host: db` and `username: postgres` in the config/database.yml file

##### Start the web app container  

This step doesn't do any port-forwarding  
`docker-compose run web rails s -b 0.0.0.0`

Start the container and attach it. Port forwarding works here  
`docker-compose up`

to see the routes - 
`docker-compose run web rails routes`

OR 
```
docker-compose run web /bin/bash    
rails routes
```

The following 2 commands can be used to verfiy that our data is persisting when containers are 
shut-down or brought back up  
`docker-compose down
docker-compose up`

load the localhost:3000/tweets page again, and it should work  

We can make a tiny change to the routes.rb file and add the following line to it if we want localhost:3000 to redirect
to the /tweets page  
`root "tweets#index"`
This would require a change in a lot of places(the html files where we are redirecting back to the index page)  

##### MODEL OPERATIONS

Once PG and web app containers are up and running, let's create the models.  
Keep in mind that with every change made to the migration files, migration has to be run.  
Also, a new migration file needs to be created for every migration.  

Creating a scaffolding takes care of initializing the model and creating respective views   
`rails generate scaffold User username:string password:string`
Scaffolding automatically adds an id to the table, no need to create that  


###### **CREATE MODELS**
```
rails g scaffold User username:string password:string  
rails g scaffold Comment 
rails g scaffold Invite 
rails g scaffold Rsvp answer:boolean
rails g scaffold Event venue:string
```


To start afresh, destroy the scaffold using -  
`
rails destroy scaffold User
`

To create a new migration file  
`rails g migration AddAssociations user:references`  

After modifying the models each time, run:  
`rails db:migrate`
