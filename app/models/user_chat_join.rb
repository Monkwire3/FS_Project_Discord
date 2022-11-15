# == Schema Information
#
# Table name: user_chat_joins
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  chat_id    :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserChatJoin < ApplicationRecord

    belongs_to: :user,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to: :chat,
        foreign_key: :chat_id,
        class_name: :Chat


end
