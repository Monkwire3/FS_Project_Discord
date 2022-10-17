json.array! (@servers) do |server|
    json.id server.id
    json.server_name server.server_name
    json.owner server.owner
    json.members server.members
    json.channels server.channels
end