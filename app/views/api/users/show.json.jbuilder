json.user do
    json.extract! @user, :id, :email, :username, :friends, :sent_friend_requests, :received_friend_requests, :chats, :created_at, :updated_at
end