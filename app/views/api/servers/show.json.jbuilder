json.server do
    json.extract! @server, :id, :server_name, :owner, :members, :channels
end