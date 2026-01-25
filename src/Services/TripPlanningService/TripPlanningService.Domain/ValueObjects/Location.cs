namespace TripPlanningService.Domain.ValueObjects
{
    public record Location
    {
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        private Location(string name, double latitude, double longitude)
        {
            Name = name;
            Latitude = latitude;
            Longitude = longitude;
        }

        public static Location Create(string name, double latitude, double longitude)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("Name Mustn't be Null");
            return new Location(name, latitude, longitude);
        }
    }
}
