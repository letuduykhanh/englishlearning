class ReadCaption
  def initialize(file)
    @caption = file.open { |f| f.each_line.map(&:chomp).split { |line| line == '' } }
  end

  def parse
    @caption =
      @caption.map.with_index do |line, idx|
        next if idx.zero? || line.blank?

        times = line[0].split ' --> '
        text = line - [line[0]]
        { start: times[0], end: times[1], text: text.join("\n").remove('&nbsp;') }
      end

    @caption.compact
  end
end
