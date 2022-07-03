class CaptionsController < ApplicationController
  before_action :set_video, :download, only: %i[download show]

  def show
    @caption = ReadCaption.new(@video.caption).parse
    render partial: 'show', locals: { caption: @caption }
  end

  private

  def set_video
    @video = Video.find_or_initialize_by video_id: video_id
  end

  def download
    return if @video.caption.attached?

    CaptionDownloaderJob.perform_now @video
  end

  def video_id
    params[:video_id]
  end
end
