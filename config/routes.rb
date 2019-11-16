Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#login'
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :events
  resources :rsvps
  resources :invites
  resources :comments
  resources :users
end
