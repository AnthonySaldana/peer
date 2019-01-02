require 'httparty'

class PeerController < ApplicationController
  def index
    zip = params[:zip].to_i
    if zip != 0
      url = 'http://127.0.0.1:5000/peer?zip=' + zip.to_s
      response = HTTParty.get(url)
      return render json: response
    end
    render default
  end
  def default
  end
end
