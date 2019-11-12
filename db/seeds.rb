# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(
  email: "foo@bar.com",
  password: "password",
  password_confirmation: "password",
  first_name: "foo",
  last_name: "bar"
)

User.create(
  email: "bar@foo.com",
  password: "password",
  password_confirmation: "password",
  first_name: "bar",
  last_name: "foo"
)
