# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

for i in 1..10000
    p "#{i} Aloha! :)"
    @user = User.create!(
            id: i,
            email: "#{i}-hi.pack@g.com",
            password: "test_password",
            password_confirmation: "test_password",
            first_name: "hi.pack",
            last_name: "hi.lastname"
    )
    @event = Event.create!(
        id: i,
        user_id: @user.id,
        host_name: @user.email,
        location_name: "blr",
        street_address: "blah",
        start_time: "2019-11-30 01:52:00.67957",
        end_time: "2019-11-30 01:52:00.67957",
        title: "foo",
        description: @user.email
    )
    end
end
