class ApplicationController < ActionController::API

    def current_user
        @current_user ||= User.find_by_credentials(session_token: session[:session_token])
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout
        current_user.reset_session_token! if current_user
        session[:session_token] = nil
        @current_user = nil
    end


    before_action :snake_case_params

    private

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def snake_case_params
    params.deep_transform_keys!(&:underscore)
    end

end