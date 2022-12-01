@channels.each do |channel|
    json.set! channel.id do
        json.id channel.id
        json.serverId channel.server_id
        json.name channel.channel_name
        json.messages channel.messages
    end
end