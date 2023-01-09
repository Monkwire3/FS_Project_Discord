@messages.each do |message|
    json.set! message.id do
        json.id message.id
        json.body message.body
        json.sender message.sender
        json.created_at message.created_at
        json.updated_at message.updated_at
    end
end