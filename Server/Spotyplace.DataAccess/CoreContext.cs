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

        public DbSet<Marker> Markers { get; set; }

        public DbSet<PublicUserLocation> PublicUserLocations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(ConnectionString, b => b.MigrationsAssembly("Spotyplace.DataAccess"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>(Configure);
            builder.Entity<Location>(Configure);
            builder.Entity<Floor>(Configure);
            builder.Entity<Marker>(Configure);
            builder.Entity<PublicUserLocation>(Configure);
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
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");
            entity.Property(e => e.ModifiedAt).HasDefaultValueSql("now() at time zone 'utc'");
        }

        /// <summary>
        /// Configure floors.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<Floor> entity)
        {
            entity.HasKey(e => e.FloorId);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");
            entity.Property(e => e.ModifiedAt).HasDefaultValueSql("now() at time zone 'utc'");
        }

        /// <summary>
        /// Configure markers.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<Marker> entity)
        {
            entity.HasKey(e => e.MarkerId);
            entity.HasOne<Floor>(e => e.Floor).WithMany(e => e.Markers);
        }

        /// <summary>
        /// Configure public user locations.
        /// </summary>
        /// <param name="entity"></param>
        private static void Configure(EntityTypeBuilder<PublicUserLocation> entity)
        {
            entity.HasKey(e => new { e.UserId, e.LocationId });
            entity.HasOne(e => e.User).WithMany(e => e.PublicUserLocations).HasForeignKey(e => e.UserId);
            entity.HasOne(e => e.Location).WithMany(e => e.PublicUserLocations).HasForeignKey(e => e.LocationId);
        }
    }
}
