class Video < ApplicationRecord
  has_one_attached :caption

  validates :video_id, length: { is: 11 }
end
