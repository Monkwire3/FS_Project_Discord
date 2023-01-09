@channels.each do |channel|
    json.set! channel.id do
        json.id channel.id
        json.serverId channel.server_id
        json.name channel.channel_name
        # json.messages channel.messages
        # channel.messages do |message|
        #     json.set! message.id do
        #         json.id message.id
        #         json.body message.body
        #         json.sender message.sender
        #     end
        # end
    end
end