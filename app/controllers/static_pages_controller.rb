class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def chapter1
    render 'chapter1'
  end
end
