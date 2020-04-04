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

        public List<Movement> getInfectedMovement()
        {
            List<Movement> result = new List<Movement>();
            DateTime time = DateTime.Now;

            IEnumerable<User> infecteds = getCurrentlyInfectedUsers().GetAwaiter().GetResult();

            var movements = Context.Movements.Include(m => m.User);

            foreach(Movement m in movements)
            {
                if (infecteds.Contains(m.User) && (DateTime.Now - m.Date).Days <= 5)
                    result.Add(m);
            }
            return result;

            //return Context.Movements.Include(m => m.User).Where(m => infecteds.Contains(m.User) && (DateTime.Now - m.Date).Days <=5).AsEnumerable(); //TODO : date<5
        }

        public async Task<IEnumerable<User>> getCurrentlyInfectedUsers()
        {
            Console.WriteLine("coucou !");
            string test = "coucou";
            Console.WriteLine(test);
            var users = Context.Users.Include(u => u.Tests);
            var response = await users.Where(user => user.RegistreNational=="aaaaa").ToListAsync();
            List<User> usersList = new List<User>();

            if (users.Count() == 0)
                return usersList;

            foreach (User u in users.AsEnumerable())
            {
                if (isUserInfected(u))
                    usersList.Add(u);
            }

            return usersList;


            //return Context.Users.Include(u => u.Tests).Where(u => isUserInfected(u)).AsEnumerable();
        }

        public bool isUserInfected(User user)
        {
            List<Test> tests = new List<Test>();

            user.Tests.ToList().ForEach(test => tests.Add(test));

            var count = tests.Count;

            if (count == 0)
                return false;

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

            movements.ForEach(move => moves.Add(new Movement(user, move.Date, move.Longitude, move.Latitude)));

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
