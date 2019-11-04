Rails.application.routes.draw do
  resources :events
  resources :rsvps
  resources :invites
  resources :comments
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
end
