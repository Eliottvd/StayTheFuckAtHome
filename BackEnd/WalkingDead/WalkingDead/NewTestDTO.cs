using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static WalkingDead.Models.WalkindDBManager;

namespace WalkingDead
{
    public class NewTestDTO
    {
        public string registreNational { get; set; }
        public string codePostal { get; set; }
        public string Result { get; set; }
        public List<coords> movements { get; set; }

        public NewTestDTO(string registreNational, string codePostal, string result, List<coords> movements)
        {
            this.registreNational = registreNational;
            this.codePostal = codePostal;
            Result = result;
            this.movements = movements;
        }

        public override string ToString()
        {
            return $"NOUVEAU TEST// registr national : {registreNational} / code postal : {codePostal}" +
                $"/ resultat : {Result} / mouvement 1 : lat{movements[0].latitude} lon{movements[0].longitude} {movements[0].date}" +
                $"/ nbr de mouvement : {movements.Count}";
        }
    }
}
