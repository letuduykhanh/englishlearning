require 'google/apis/youtube_v3'

Google::Apis.logger.level = Logger::DEBUG

class Youtube
  def initialize
    @service = Google::Apis::YoutubeV3::YouTubeService.new
    @service.key = 'AIzaSyCDjuS0D88blEsG-hH_BfYum5sdbc5qxuE'
  end

  def list_searches(
    part: 'snippet', channel_id: nil, max_results: 10,
    fields: 'items(id(videoId), snippet(channelTitle, thumbnails(medium), title))'
  )
    @service.list_searches part, channel_id: channel_id, max_results: max_results, fields: fields
  rescue Google::Apis::ServerError, Google::Apis::ClientError, Google::Apis::AuthorizationError => e
    raise e
  end

  # def list_captions(part: 'id', video_id: nil, fields: 'items(id)')
  #   @service.list_captions(part, video_id, fields: fields)
  # rescue Google::Apis::ServerError, Google::Apis::ClientError, Google::Apis::AuthorizationError => e
  #   raise(e)
  # end

  # def download_caption(id: nil, tfmt: 'vtt', fields: nil)
  #   @service.download_caption(id, tfmt: tfmt, fields: fields)
  # rescue Google::Apis::ServerError, Google::Apis::ClientError, Google::Apis::AuthorizationError => e
  #   raise(e)
  # end
end

# def initialize
#   @service = Google::Apis::YoutubeV3::YouTubeService.new
#   @service.authorization = Google::Auth::ServiceAccountCredentials.make_creds(
#     json_key_io: File.open('./config/google-cred.json'),
#     scope: [Google::Apis::YoutubeV3::AUTH_YOUTUBE, Google::Apis::YoutubeV3::AUTH_YOUTUBE_FORCE_SSL]
#   )
#   @service.authorization.fetch_access_token!
# end

# require 'googleauth'
# require 'googleauth/web_user_authorizer'
# require 'googleauth/stores/file_token_store'

# client_id = Google::Auth::ClientId.from_file(CLIENT_SECRETS_PATH)
# scope = Google::Apis::YoutubeV3::AUTH_YOUTUBE_READONLY
# token_store = Google::Auth::Stores::FileTokenStore.new(file: CREDENTIALS_PATH)
# authorizer = Google::Auth::WebUserAuthorizer.new(client_id, scope, token_store, '/oauth2callback')

# get('/authorize') do
#   # NOTE: Assumes the user is already authenticated to the app
#   user_id = request.session['user_id']
#   credentials = authorizer.get_credentials(user_id, request)
#   redirect authorizer.get_authorization_url(login_hint: user_id, request: request) if credentials.nil?
#   # Credentials are valid, can call APIs
#   # ...
# end

# get('/oauth2callback') do
#   target_url = Google::Auth::WebUserAuthorizer.handle_auth_callback_deferred(request)
#   redirect target_url
# end

# class Youtube
#   REDIRECT_URI = 'http://localhost:2000/'
#   APPLICATION_NAME = 'Bootstrap'
#   CLIENT_SECRETS_PATH = File.join('config', 'secrets', 'client_secret.json')
#   CREDENTIALS_PATH = File.join('config', 'credentials', 'credentials.yml')
#   SCOPE = Google::Apis::YoutubeV3::AUTH_YOUTUBE_READONLY

#   def initialize
#     client_id = Google::Auth::ClientId.from_file(CLIENT_SECRETS_PATH)
#     token_store = Google::Auth::Stores::FileTokenStore.new(file: CREDENTIALS_PATH)
#     authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)
#     user_id = ENV['USER']
#     credentials = authorizer.get_credentials(user_id)
#     if credentials.nil?
#       url = authorizer.get_authorization_url(base_url: REDIRECT_URI)
#       puts('Open the following URL in the browser and enter the ' + 'resulting code after authorization')
#       puts(url)
#       code = gets
#       credentials = authorizer.get_and_store_credentials_from_code(
#         user_id: user_id, code: code, base_url: REDIRECT_URI
#       )
#     end
#     puts(credentials.nil?)
#     # credentials
#   end

#   private_constant :REDIRECT_URI
#   private_constant :APPLICATION_NAME
#   private_constant :CLIENT_SECRETS_PATH
#   private_constant :CREDENTIALS_PATH
#   private_constant :SCOPE
# end
