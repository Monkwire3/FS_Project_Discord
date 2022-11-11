# == Schema Information
#
# Table name: friends
#
#  id           :bigint           not null, primary key
#  requester_id :bigint           not null
#  requestee_id :bigint           not null
#  accepted     :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Friend < ApplicationRecord

    belongs_to :requester,
        foreign_key: :requestee_id,
        class_name: :User
    
    belongs_to :requestee,
        foreign_key: :requester_id,
        class_name: :User


    
    
end
