using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class Test
    {
        public long Id { get; set; }

        //SUSCEPTIBLE, INFECTIOUS, REMOVED
        public string Result { get; set; }
        public DateTime Date { get; set; }
        public string IdUser { get; set; }
        public User User { get; set; }

        public Test(long id, string result, DateTime date, string idUser, User user)
        {
            Id = id;
            Result = result;
            Date = date;
            IdUser = idUser;
            User = user;
        }
        public Test(string result, DateTime date, string idUser, User user)
        {
            Result = result;
            Date = date;
            IdUser = idUser;
            User = user;
        }
        public Test(string result, DateTime date, string idUser)
        {
            Result = result;
            Date = date;
            IdUser = idUser;
        }
    }
}
