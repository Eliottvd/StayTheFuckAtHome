using Microsoft.EntityFrameworkCore;

namespace WalkingDead.Models
{
    public class WalkingDeadContext : DbContext
    {
        public WalkingDeadContext(DbContextOptions<WalkingDeadContext> options)
            : base(options)
        {
        }

        public DbSet<Test> WalkingDeadItems { get; set; }

        public DbSet<Movement> Movements { get; set; }
    }
}
