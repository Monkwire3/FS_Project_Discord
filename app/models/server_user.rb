# == Schema Information
#
# Table name: server_users
#
#  id         :bigint           not null, primary key
#  server_id  :bigint
#  user_id    :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ServerUser < ApplicationRecord

    # has_many :servers,
    #     foreign_key: :server_id, 
    #     class_name: :Server
    
    # has_many :users,
    #     foreign_key: :user_id,
    #     class_name: :User

    belongs_to :servers,
        foreign_key: :server_id, 
        class_name: :Server

    belongs_to :users,
        foreign_key: :user_id,
        class_name: :User


end
