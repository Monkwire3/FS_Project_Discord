json.server do
    json.extract! @server, :id, :server_name, :owner, :members
end