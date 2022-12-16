json.array! (@requests) do |req|
    json.id req.id
    json.requester req.requester
    json.requestee req.requestee
    json.accepted req.accepted
end