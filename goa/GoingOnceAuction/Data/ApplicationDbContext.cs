using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GoingOnceAuction.Models;
using Microsoft.AspNetCore.Identity;

namespace GoingOnceAuction.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>(options)
{

    // TABLES
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Bid> Bids { get; set; }
    public DbSet<Transaction> Transactions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // This needs to be called first

        // Define relations

        // User to Items one-to-many relationship
        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.Items)
            .WithOne(u=> u.Owner)
            .HasForeignKey(u => u.OwnerId);

        // User to Auctions one-to-many relationship
        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.AuctionsRan)
            .WithOne(i => i.Owner)
            .HasForeignKey(i => i.OwnerId);

        // User to Bids one-to-many relationship
        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.Bids)
            .WithOne(b => b.Bidder)
            .HasForeignKey(b => b.BidderId);


        // AUCTION RELATIONS

        // Auction to Bids one-to-many relationship
        modelBuilder.Entity<Auction>()
            .HasMany(u => u.Bids)
            .WithOne(b => b.Auction)
            .HasForeignKey(b => b.AuctionId);



        // ITEM RELATIONS

        // Category to Item one-to-many relationship

        // Item to Transaction one-to-one relationship
        modelBuilder.Entity<Transaction>()
            .HasOne(i => i.Item)
            .WithOne(t => t.LastTransaction)
            .HasForeignKey<Transaction>(t => t.ItemId);


        // CATEGORY RELATIONS


    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }
}
