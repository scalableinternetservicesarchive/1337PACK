json.extract! tweet, :id, :message, :author, :created_at, :updated_at
json.url tweet_url(tweet, format: :json)
