# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  validates :username, length: { in: 2..32 }, uniqueness: true, format: { without: URI::MailTo::EMAIL_REGEXP } 
  validates :email, uniqueness: { message: "Email is already registered" }
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP, message: 'Not a well formed email address'}
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :servers_owned,
    foreign_key: :owner_id,
    class_name: :Server,
    inverse_of: :owner


  attr_reader :password

  def self.find_by_credentials(cred, pass)
    @user = User.find_by(username: cred) || User.find_by(email: cred)

    @user.authenticate(pass)

  end 

  def password=(password)
    @password = BCrypt::Password.create(password)
    self.password_digest = @password
  end




def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    return self.session_token
end

private

def generate_unique_session_token
    token = SecureRandom.base64

    token = SecureRandom.base64 while User.find_by(session_token: token)


    return token
end

def ensure_session_token
    self.session_token ||= generate_unique_session_token
end

end
