json.array! (@channels) do |channel|
    json.serverId channel.server_id
    json.id channel.id
    json.name channel.channel_name
end