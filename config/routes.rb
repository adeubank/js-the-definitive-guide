Javascript::Application.routes.draw do
  root to: "static_pages#home"

  get 'chapter1', to: "static_pages#chapter1"
  get 'chapter5', to: "static_pages#chapter5"
end
