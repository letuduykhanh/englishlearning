source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 7.0.2', '>= 7.0.2.2'

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'sprockets-rails'

# A simple, fast Mysql library for Ruby, binding to libmysql
gem 'mysql2', '~> 0.5.3'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 5.0'

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem 'jsbundling-rails'

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem 'turbo-rails'

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails'

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem 'cssbundling-rails'

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'

# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem 'image_processing', '~> 1.12', '>= 1.12.2'

# Additions
gem 'batch-loader', '~> 2.0', '>= 2.0.1'
# gem 'google-apis-youtube_v3', '~> 0.16.0'
# gem 'googleauth', '~> 1.1', '>= 1.1.2'

# Load parts of your page through simple JavaScript and Rails pipeline
gem 'render_async', '~> 2.1', '>= 2.1.11'

# gem 'pycall', '~> 1.4', '>= 1.4.1'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]

  # Additions
  gem 'bullet', '~> 7.0', '>= 7.0.1'
  gem 'faker', '~> 2.19'
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'web-console'

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  gem 'rack-mini-profiler'

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  # Debugging Tools
  gem 'byebug', '~> 11.1', '>= 11.1.3'
  gem 'pry', '~> 0.14.1'

  # Code Style Guides
  gem 'erb_lint', '~> 0.1.1'
  gem 'fasterer', '~> 0.9.0'
  gem 'htmlbeautifier', '~> 1.4', '>= 1.4.1'
  gem 'rails_best_practices', '~> 1.23', '>= 1.23.1'
  gem 'reek', '~> 6.1'
  gem 'rubocop', '~> 1.25', '>= 1.25.1'
  gem 'rubocop-performance', '~> 1.13', '>= 1.13.2'
  gem 'rubocop-rails', '~> 2.13', '>= 2.13.2'
  gem 'solargraph', '~> 0.44.3'

  gem 'overcommit', '~> 0.58.0'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end
