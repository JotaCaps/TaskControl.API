using Microsoft.EntityFrameworkCore;
using TaskControl.Domain.Entities;

namespace TaskControl.Infrastructure
{
    public class TaskControlDbContext : DbContext
    {
        public TaskControlDbContext(DbContextOptions<TaskControlDbContext> options)
            : base(options) { }
        public DbSet<Tarefa> Tarefas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Tarefa>(e =>
                {
                    e.Property(t => t.Titulo)
                    .IsRequired()
                    .HasMaxLength(100);

                    e.Property(t => t.DataDeCriacao)
                    .HasDefaultValueSql("GETDATE()");
                });

                base.OnModelCreating(builder);
        }
    }
}
