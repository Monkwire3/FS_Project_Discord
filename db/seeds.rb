# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating dummy user"
User.create({username: 'dummy_user', email: 'dummy_user_email@mail.com', password: 'iamadummy'})
puts "Created user: #{User.first}."
puts "Creating dummy server."
Server.create({server_name: 'dummy server', owner: User.first})
puts "Created server: #{Server.first}"
puts "Creating dummy channel."
Channel.create({channel_name: 'chat_messages', server_id: 1})
puts "Created channel: #{Channel.first}"
puts "Creating dummy chat."
Chat.create({title: 'channel_messages', members: []});
puts "Created Chat: #{Chat.first}"


puts "Creating demo user"
User.create({ username: 'usr', email: 'user@mail.com', password: 'starwars'})
puts "Created demo user: #{User.find(2)}"


puts "Creating more users"
100.times do
    User.create({ username: Faker::Artist.name, email: "#{Faker::Hipster.word}@mail.com", password: 'password'})
end
puts "Created #{User.all.length - 2} new users."


puts "Making friends"
20.times do
    Friend.create({requester_id: User.find(rand(2..10)), requestee_id: User.find(rand(2..10)), accepted: true})
end
puts "Created #{Friend.all.length} new friendships."



puts "Creating servers"
10.times do |i|
    Server.create({server_name: Faker::Hipster.word, owner: User.find(rand(2...10))})
    puts "Created server #{Server.last}"

    puts "Creating member list for server #{Server.last}"
    10.times do
        Server.last.members.push(User.find(rand(2...20)))
    end

    puts "Added #{Server.last.members.length} members to server #{Server.last}"

    puts "Creating channels for server #{Server.last} "
    5.times { Channel.create({channel_name: Faker::Hipster.word, server_id: Server.last.id}) }
end


puts "Created #{Server.all.length} servers"