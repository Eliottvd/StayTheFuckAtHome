using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class Movement
    {
        public long Id { get; set; }
        public string IdUser { get; set; }
        public DateTime Date { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public User User { get; set; }

        public Movement(long id, string idUser, DateTime date, double longitude, double latitude, User user)
        {
            Id = id;
            IdUser = idUser;
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
            User = user;
        }
        public Movement(string idUser, DateTime date, double longitude, double latitude, User user)
        {
            IdUser = idUser;
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
            User = user;
        }
        public Movement(string idUser, DateTime date, double longitude, double latitude)
        {
            IdUser = idUser;
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}
