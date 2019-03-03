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

        public DbSet<Location> Locations { get; set; }

        public DbSet<Floor> Floors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(ConnectionString, b => b.MigrationsAssembly("Spotyplace.DataAccess"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>(Configure);
            builder.Entity<Location>(Configure);
            builder.Entity<Floor>(Configure);
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

        /// <summary>
        /// Configure locations.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<Location> entity)
        {
            entity.HasKey(e => e.LocationId);
            entity.HasMany<Floor>(e => e.Floors).WithOne(e => e.Location);
            entity.HasOne<ApplicationUser>(e => e.Owner).WithMany(e => e.Locations);
        }

        /// <summary>
        /// Configure floors.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<Floor> entity)
        {
            entity.HasKey(e => e.FloorId);
        }
    }
}
