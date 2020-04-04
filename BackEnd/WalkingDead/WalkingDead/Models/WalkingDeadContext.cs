using Microsoft.EntityFrameworkCore;

namespace WalkingDead.Models
{
    public class WalkingDeadContext : DbContext
    {
        public WalkingDeadContext()
        {
        }

        public WalkingDeadContext(DbContextOptions<WalkingDeadContext> options)
            : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:walkingdeadserver.database.windows.net,1433;Initial Catalog=WalkingDeads;Persist Security Info=False;User ID=walkingdead;Password={Lenl3f8L};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }
    }
}
