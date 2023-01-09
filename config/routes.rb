Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount ActionCable.server => "/cable"

  post '/api/test', to: 'application#test'
  # post '/api/users/:user_id/chats/', to 'chats#create'

  post '/api/servers/join', to: 'api/servers#join'

  get '/api/messages/chat/:id', to: 'api/messages#chat_index'
  get '/api/messages/channel/:id', to: 'api/messages#channel_index'
  get '/api/friends', to: 'api/users#friends'
  get  '/api/friendRequests', to: 'api/users#get_friend_requests';
  post '/api/friends', to: 'api/users#send_friend_request'
  patch '/api/friends/', to: 'api/users#accept_friend_request'
  delete '/api/friends/', to: 'api/users#remove_friend'

  get '/api/servers/undiscovered', to: 'api/servers#undiscovered';

  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:create, :destroy, :update]
    resources :chats, only: [:create, :index, :show, :destroy]
    resources :users, only: [:index, :show, :create, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index, :show]
    end
    resources :channels, only: [:show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
