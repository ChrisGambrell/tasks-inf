Rails.application.routes.draw do
  resources :tasks
  resources :headers
  resources :projects
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'api/v1' do
    resources :areas, param: :area_id
    resources :headers, param: :header_id
    resources :projects, param: :project_id
  end
end
