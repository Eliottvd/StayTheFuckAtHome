using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class Movement
    {
        public long Id { get; set; }
        public long IdUser { get; set; }
        public DateTime Date { get; set; }
        public long Longitude { get; set; }
        public long Latitude { get; set; }
    }
}
