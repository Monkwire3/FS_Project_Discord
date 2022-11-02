json.set! @channel.id do
    json.id @channel.id
    json.serverId @channel.server_id
    json.name @channel.channel_name
end