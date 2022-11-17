json.title @chat.title
# json.messages json.messages
json.messages do
 json.array! (@chat.messages) do |message|
    json.id message.id
    json.body message.body
    json.chat_id message.chat_id
    json.sender message.sender
end
end
json.members @chat.members
