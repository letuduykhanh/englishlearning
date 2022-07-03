class DictionariesController < ApplicationController
  def search
    result = entries
    return head :no_content if result.blank?

    render partial: 'word', locals: { entries: result }, status: :ok
  end

  private

  def word
    params[:word]
  end

  def entries
    origin = Dictionary.where word: word
    return origin if origin.present?

    Dictionary.where word: word.singularize
  end
end

# plural = Dictionary.where word: word
# word_pluralize = word.pluralize

# [word.singularize, word_pluralize]
# pluralize_query = query.where word: word_pluralize
# query = pluralize_query if pluralize_query.present?

# def new
#   @dictionary = Dictionary.new
# end

# def create
#   dictionary = Dictionary.new name: dictionary_param.original_filename,
#                               dictionary: JSON.parse(dictionary_param.read)
#   render plain: dictionary.save
# end

# def dictionary_param
#   params.require(:dictionary).permit(:dictionary)[:dictionary]
# end

# render json: json_file[0]['meanings']

# uri = URI.parse 'https://api.dictionaryapi.dev/api/v2/entries/en/'.concat params[:word]
# res = Net::HTTP.get_response uri
# return render json: res.body, status: :ok if res.is_a? Net::HTTPSuccess

# head :service_unavailable

# include PyCall::Import
# pyfrom :PyDictionary, import: :PyDictionary
# dict = PyDictionary
# render plain: dict.meaning('love').to_json
