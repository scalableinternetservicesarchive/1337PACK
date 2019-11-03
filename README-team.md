**Orchestration**

>> docker run postgres
>> docker-compose build web
>> docker-compose run web rails new . --no-deps --database postgres

# this step doesn't do any port-forwarding
>> docker-compose run web rails s -b 0.0.0.0

# start the container and attach it. Port forwarding works here
>> docker-compose up

While debugging, if you encounter PSQL issues, it doesn't mean you wait for the server
to come up each time before you hit the issue. Instead, try to create the DB - 

>> docker-compose run web rails db:create

This creates the database: app_developement and app_test - this is needed to run the app

Make sure to add host: db and username: postgres in the config/database.yml file


>> docker-compose run web rails generate scaffold Tweet message:string author:string

to see the routes - 
>> docker-compose run web rails routes

OR 
docker-compose run web /bin/bash 
>> rails routes


Change the migrate file and add the non-null conditions
>> rails db:migrate

