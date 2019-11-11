Rails.application.routes.draw do
  get 'users/index'
  post 'users/create'
  get 'users/show/:id', to: 'users#show'
  delete 'users/destory/:id', to: 'users#destroy'
  
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
