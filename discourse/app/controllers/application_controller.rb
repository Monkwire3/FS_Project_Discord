class ApplicationController < ActionController::API
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout
        current_user.reset_session_token! if current_user
        session[:session_token] = nil
        @current_user = nil
    end

    def test
        if params.has_key?(:login)
            login(User.first)
        elsif params.has_key?(:logout)
            logout
        end

        if current_user
            render json: { user: current_user.slice('id', 'username', 'session_token') }
        else
            puts 'else'
            render json: ['No current user']
        end
    end
    


    before_action :snake_case_params

    private

    def snake_case_params
    params.deep_transform_keys!(&:underscore)
    end
end
