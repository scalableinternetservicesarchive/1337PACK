Rails.application.routes.draw do
  namespace :api do
    resources :users do
      resources :events, only: [:index]
      resources :invites, only: [:index]
      resources :rsvps, only: [:index]
    end
    resources :events do
      resources :comments, shallow: true
      resources :invites, shallow: true
      resources :rsvps, shallow: true
    end
    get 'events', to: 'events#all'
    post 'auth/login', to: 'authentication#login'    
  end
  root 'home#index'
  get '/*path' => 'home#index'
end
