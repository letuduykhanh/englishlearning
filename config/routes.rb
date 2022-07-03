Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'videos#index'

  resources :videos
  resources :music
  resources :games
  resources :books
  resources :captions, param: :video_id, only: :show
  get 'search/:word', as: :search, action: :search, controller: :dictionaries
end
