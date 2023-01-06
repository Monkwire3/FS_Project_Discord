json.array! (@chats) do |chat|
    json.id chat.id
    json.title chat.title
    json.members chat.members
end