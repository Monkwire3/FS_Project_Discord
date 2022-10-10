# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :username, length: { in: 2..32 }, uniqueness: true, format: { without: URI::MailTo::EMAIL_REGEXP }
    validates :email, format:  { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    # validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    # before_validation :ensure_session_token

    attr_reader :password

    def password=(password)
        @password = BCrypt::Password.create(password)
        self.password_digest = @password
    end


    def find_by_credentials(cred, pass)
        @user = User.find_by(username: cred) || User.find_by(email: cred)

        if Password.new(@user.password_digest) == BCrypt::Password.create(pass)
            return @user
        end
        return nil
    end

    private

    def generate_unique_session_token
        token = SecureRandom.base64

        token = SecureRandom.base64 while User.find_by(session: token)

        return token
    end

    # def ensure_session_token
    #     self.session_token ||= generate_unique_session_token
    # end





end
