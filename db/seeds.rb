# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.create({ username: 'usr', email: 'user@mail.com', password: 'starwars'})


10.times do
    User.create({ username: Faker::Artist.name, email: "#{Faker::Hipster.word}@mail.com", password: 'password'})
end


10.times do |i|
    Server.create({server_name: Faker::Hipster.word, owner: User.find(rand(1..10)) })
    5.times { Channel.create({channel_name: Faker::Hipster.word, server_id: i}) }
end
