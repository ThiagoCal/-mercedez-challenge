class MuseumsController < ApplicationController
  def search
    coordinates = validate_params(params[:lat], params[:lng])
    if coordinates[:valid]
      @museums = build_museums_response(coordinates[:lat], coordinates[:lng])
      render json: @museums.to_json, status: coordinates[:status]
    else
      render json: { errors: coordinates[:errors] }, status: coordinates[:status]
    end
  end

  private

  def validate_params(lat, lng)
    valid_lat = lat.present? && lat.to_f.between?(-90, 90)
    valid_lng = lng.present? && lng.to_f.between?(-180, 180)
    return { valid: true, lat:, lng:, status: :ok } if valid_lat && valid_lng

    build_error_messages(lat, lng, valid_lat, valid_lng)
  end

  def build_error_messages(lat, lng, valid_lat, valid_lng)
    errors = []
    if lat.nil? || lng.nil?
      status = :bad_request
      errors << 'Please provide lat and lng'
    else
      status = :unprocessable_entity
      errors << 'lat must be between -90 and 90' unless valid_lat
      errors << 'lng must be between -180 and 180' unless valid_lng
    end
    { valid: false, errors:, status: }
  end

  def build_museums_response(lat, lng)
    museums_data = fetch_museums_data(lat, lng)
    parse_museums_data(museums_data)
  end

  def fetch_museums_data(lat, lng)
    request = HTTParty.get("https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?type=poi&proximity=#{lng},#{lat}&access_token=#{ENV['MAPBOX_KEY']}")
    JSON.parse(request.parsed_response)
  end

  def parse_museums_data(data)
    data['features'].each_with_object({}) do |museum, hash|
      hash[museum['context'][0]['text']] = [] unless hash[museum['context'][0]['text']]
      hash[museum['context'][0]['text']] << museum['text']
    end
  end
end
