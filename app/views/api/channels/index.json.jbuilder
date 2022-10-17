json.array! (@channels) do |server|
    json.serverId channel.serverId
    json.id channel.id
    json.name channel.channel_name
end