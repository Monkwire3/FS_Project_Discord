json.array! (@servers) do |server|
    json.name server.server_name
    json.owner server.owner
    json.members server.members
end