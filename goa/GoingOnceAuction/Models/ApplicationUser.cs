using Microsoft.AspNetCore.Identity;

namespace GoingOnceAuction.Models;

// Add profile data for application users by adding properties to the ApplicationUser class
public class ApplicationUser : IdentityUser<Guid>
{
     // Personal Information
        
        public DateTime DateOfBirth { get; set; }
        
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? PostalCode { get; set; }
        public string? ProfilePictureUrl { get; set; }

        // Account Information
        public DateTime RegistrationDate { get; set; }
        public DateTime? LastLoginDate { get; set; }

        // Item Collections
        public ICollection<Item> Items { get; set; } = []; // Auction items created by the user
        public ICollection<Item> Favorites { get; set; } = []; // Favorite items on the platform
        
        // Auction-related Properties
        public ICollection<Auction> AuctionsRan { get; set; } = []; // Auctions held by created by the user
        public ICollection<Bid> Bids { get; set; } = []; // Bids made by the user

        // Constructor
        public ApplicationUser()
        {
            RegistrationDate = DateTime.Now;
        }
}

