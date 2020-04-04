using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class Movement
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public User User { get; set; }

        public Movement()
        {

        }

        public Movement(long id, DateTime date, double longitude, double latitude, User user)
        {
            Id = id;
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
            User = user;
        }
        public Movement(DateTime date, double longitude, double latitude, User user)
        {
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
            User = user;
        }
        public Movement(DateTime date, double longitude, double latitude)
        {
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
        }

        public Movement(User user, DateTime date, double longitude, double latitude)
        {
            User = user;
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}
