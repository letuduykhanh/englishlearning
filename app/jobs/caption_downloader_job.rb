class CaptionDownloaderJob < ApplicationJob
  queue_as :default

  def perform(video)
    create_video video
  end

  private

  def download(video_id)
    output = File.join "tmp/captions/'%(id)s'.'%(ext)s'"
    system "youtube-dl --all-subs --skip-download https://www.youtube.com/watch?v=#{video_id} -o #{output}"
  end

  def file_path
    Dir.glob('tmp/captions/*.vtt').first
  end

  def create_video(video)
    video_id = video.video_id
    return unless download(video_id) || file_path

    File.open file_path do |file|
      video.caption.attach io: file, filename: "#{video_id}.vtt", content_type: 'text/vtt'
      File.delete file

      video.save!
    end
  end
end
