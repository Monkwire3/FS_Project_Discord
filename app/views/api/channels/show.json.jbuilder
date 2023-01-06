json.id @channel.id
json.serverId @channel.server_id
json.name @channel.channel_name
# json.messages @channel.messages 
json.messages do
    json.array! (@messages) do |message|
        json.id message.id
        json.body message.body
        json.channel_id message.channel_id
        json.sender message.sender
        json.created_at message.created_at
        json.updated_at message.updated_at
    end
end
