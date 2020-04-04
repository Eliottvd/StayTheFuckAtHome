using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class User
    {
        public string CodePostal { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string RegistreNational { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
        public virtual ICollection<Movement> Movements { get; set; }

        public User(string codePostal, string registreNational, ICollection<Test> tests, ICollection<Movement> movements)
        {
            CodePostal = codePostal;
            RegistreNational = registreNational;
            Tests = tests;
            Movements = movements;
        }
        public User(string codePostal, string registreNational)
        {
            CodePostal = codePostal;
            RegistreNational = registreNational;
            Tests = new List<Test>();
            Movements = new List<Movement>();
        }
    }
}
