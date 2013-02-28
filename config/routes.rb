Javascript::Application.routes.draw do
  root to: "static_pages#home"

  get 'chapter1', to: "static_pages#chapter1"
end
