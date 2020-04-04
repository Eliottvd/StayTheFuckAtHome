using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkingDead.Models
{
    public class WalkindDBManager
    {
        public struct coords
        {
            public double latitude;
            public double longitude;
            public DateTime date;
        }
        public WalkingDeadContext Context { get; set; }

        public WalkindDBManager()
        {
            Context = new WalkingDeadContext();
        }

        public IEnumerable<Movement> getInfectedMovement()
        {
            DateTime time = DateTime.Now;

            IEnumerable<User> infecteds = getCurrentlyInfectedUsers();

            return Context.Movements.Include(m => m.User).Where(m => infecteds.Contains(m.User)); //TODO : date<5
        }

        public IEnumerable<User> getCurrentlyInfectedUsers()
        {
            Func<User, bool> isInfected = new Func<User, bool>(isUserInfected);
            return Context.Users.Include(u => u.Tests).Where(u => isUserInfected(u));
        }

        public bool isUserInfected(User user)
        {
            List<Test> tests = new List<Test>();

            user.Tests.ToList().ForEach(test => tests.Add(test));

            Test lastTest = tests[0];

            foreach(Test t in tests)
            {
                if (DateTime.Compare(lastTest.Date, t.Date) < 0)
                    lastTest = t;
            }

            if (lastTest.Result == "Infectious")
                return true;
            return false;
        }

        public void addTest(string registreNational, string codePostal, string result, List<Movement> movements)
        {
            var user = Context.Users.Find(registreNational);
            if (user == null)
            {
                user = new User(codePostal, registreNational);
                Context.Users.Add(user);
            }

            Test test = new Test(result, DateTime.Now, user);

            List<Movement> moves = new List<Movement>();

            movements.ForEach(move => moves.Add(new Movement(registreNational, move.Date, move.Longitude, move.Latitude)));

            Context.Add<Test>(test);
            moves.ForEach(move => Console.WriteLine(move.Latitude));
            moves.ForEach(move => Context.Add<Movement>(move));
            Context.SaveChanges();
        }

        public void addTest(NewTestDTO nt)
        {
            addTest(nt.registreNational, nt.codePostal, nt.Result, nt.movements);
        }
    }
}
