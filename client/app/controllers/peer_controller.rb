require 'httparty'

class PeerController < ApplicationController
  def index
    url = 'http://127.0.0.1:5000/peer?zip=90201'
    response = HTTParty.get(url)
    render json: response
  end
end
