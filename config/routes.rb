Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount ActionCable.server => "/cable"

  post '/api/test', to: 'application#test'
  # post '/api/users/:user_id/chats/', to 'chats#create'

  post '/api/friends', to: 'api/users#send_friend_request'
  patch '/api/friends/', to: 'api/users#accept_friend_request'
  delete '/api/friends/', to: 'api/users#remove_friend'

  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:create]
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
