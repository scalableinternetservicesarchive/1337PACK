json.extract! event, :id, :venue, :created_at, :updated_at
json.url event_url(event, format: :json)
