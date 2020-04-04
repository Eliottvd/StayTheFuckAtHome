using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead
{
    public class MovementDTO
    {
        public DateTime Date { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }

        public MovementDTO(DateTime date, double longitude, double latitude)
        {
            Date = date;
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}
