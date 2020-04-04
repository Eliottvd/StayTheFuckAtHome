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
        public List<Models.Movement> movements { get; set; }

        public NewTestDTO()
        {

        }

        //public NewTestDTO(string registreNational, string codePostal, string result, List<coords> movements)
        //{
        //    this.registreNational = registreNational;
        //    this.codePostal = codePostal;
        //    Result = result;
        //    this.movements = movements;
        //}

        public override string ToString()
        {
            return $"NOUVEAU TEST// registr national : {registreNational} / code postal : {codePostal}" +
                $"/ resultat : {Result} / mouvement 1 : lat{movements[0].Latitude} lon{movements[0].Longitude} {movements[0].Date}" +
                $"/ nbr de mouvement : {movements.Count}";
        }
    }
}
