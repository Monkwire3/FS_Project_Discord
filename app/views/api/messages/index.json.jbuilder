@messages.each do |message|
    json.set! message.id do
        json.id message.id
        json.body message.body
        json.sender message.sender
    end
end