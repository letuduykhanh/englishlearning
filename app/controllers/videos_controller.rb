class VideosController < ApplicationController
  before_action :video, only: :show

  def index
    file = File.read Rails.root.join('youtube.json')
    object = JSON.parse file
    @items = object['items']

    # render plain: search
  end

  def show
    head :no_content unless @video
  end

  private

  def video
    @video = Video.find_by video_id: params[:id]
  end

  def search(channel_id = 'UCHaHD477h-FeBbVh9Sh7syA')
    Youtube.new.list_searches(channel_id: channel_id).to_json
  end
end
