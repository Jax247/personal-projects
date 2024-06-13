

using GoingOnceAuction.Models;

namespace GoingOnceAuction.Models;

public class Auction
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid OwnerId { get; set; }
    public ApplicationUser Owner { get; set; }

// Item-Related Properties

    public Guid ItemId { get; set; }
    public Item Item { get; set; }

// Bid-Related Properties

    public int StartingBid { get; set; }
    public int MinimumBidIncrement { get; set; } = 0;
    public bool HasBids { get; set; } = false;
    public Bid? CurrentTopBid { get; set; }
    public ICollection<Bid> Bids { get; } = [];

// Auction Session Properties
    public bool IsInSession { get; set; } = false;
    public DateTime AuctionStartTime { get; set; } = DateTime.Now;
    public TimeSpan AuctionDuration { get; set; }
    public DateTime AuctionEndTime { get; set; }
    public TimeSpan OvertimeThreshold { get; set; } = new TimeSpan(0, 10, 0);
    public Guid? WinnerId { get; set; }
    public Guid? Winner { get; set; }

}