using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Spotyplace.Entities.Models;
using System;

namespace Spotyplace.DataAccess
{
    public class CoreContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public CoreContext(DbContextOptions<CoreContext> options) : base(options) { }

        public CoreContext() { }

        public static string ConnectionString { get; set; }

        public new DbSet<ApplicationUser> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(ConnectionString, b => b.MigrationsAssembly("Spotyplace.DataAccess"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>(Configure);
            base.OnModelCreating(builder);
        }

        /// <summary>
        /// Configure users.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<ApplicationUser> entity)
        {
            entity.HasKey(e => e.Id);
        }
    }
}
