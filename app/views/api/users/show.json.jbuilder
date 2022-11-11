json.user do
    json.extract! @user, :id, :email, :username, :friends, :created_at, :updated_at
end