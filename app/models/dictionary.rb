class Dictionary < ApplicationRecord
  def self.search(word) # rubocop:disable Style/DisableCopsWithinSourceCodeDirective, Metrics/MethodLength
    query = <<-SQL.squish
      SELECT
        JSON_EXTRACT(
          LOWER( dictionary -> '$.*' ),
          JSON_UNQUOTE(
            JSON_SEARCH(
              LOWER( dictionary -> '$**.word' ),
              'one',
              LOWER( ? )
            ))) result
      FROM
        dictionaries
      WHERE name = LOWER( ? );
    SQL

    ActiveRecord::Base.connection.execute sanitize_sql_array [query, word, "#{word.first}.json"]
  end
end
