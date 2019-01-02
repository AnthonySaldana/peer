require 'test_helper'

class PeerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get peer_index_url
    assert_response :success
  end

end
