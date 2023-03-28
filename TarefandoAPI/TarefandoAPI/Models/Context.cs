using Microsoft.EntityFrameworkCore;

namespace TarefandoAPI.Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions<Context> options):base(options) 
        { 
        
        }

        public DbSet<Atividade> Atividades { get; set; }
    }
}
