# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  server_name :string           not null
#  owner_id    :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
    validates :server_name, length: { in: 2..32 }
    validates :owner_id, presence: true


    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User,
        inverse_of: :servers_owned

    
    
    has_many :user_connections,
        foreign_key: :server_id,
        class_name: :ServerUser,
        dependent: :destroy


    has_many :members,
        through: :user_connections,
        source: :users


    has_many :channels,
        foreign_key: :server_id,
        class_name: :Channel,
        dependent: :destroy





end