json.title @chat.title
# json.messages json.messages
json.messages do
 json.array! (@chat.messages) do |message|
    json.id message.id
    json.body message.body
    json.chat_id message.chat_id
    json.sender message.sender
    json.created_at message.created_at
    json.updated_at message.updated_at
end
end
json.members @chat.members
