class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def chapter1
    render 'chapter1'
  end

  def chapter5
    render 'chapter5'
  end
end
