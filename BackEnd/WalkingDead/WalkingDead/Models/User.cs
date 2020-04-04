using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class User
    {
        public long Id { get; set; }
        public string CodePostal { get; set; }
        public long RegistreNational { get; set; }
    }
}
