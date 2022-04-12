Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'api/v1' do
    resources :areas, param: :area_id
    resources :headers, param: :header_id
    resources :projects, param: :project_id
    resources :tasks, param: :task_id
  end
end
