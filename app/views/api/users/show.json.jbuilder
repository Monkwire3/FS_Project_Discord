json.user do
    json.extract! @user, :id, :email, :username, :friends, :chats, :created_at, :updated_at
end