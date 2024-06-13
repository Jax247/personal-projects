namespace GoingOnceAuction.Models;

public class Bid {

    public Guid Id { get; set; }
    public Guid AuctionId { get; set; }
    public Auction Auction { get; set; }

    public Guid ItemId { get; set; }
    public Item Item { get; set; }

    public Guid BidderId { get; set; }
    public ApplicationUser Bidder { get; set; }

    public int Amount { get; set; }
    public DateTime Timestamp;

    public Bid() {
        Id = Guid.NewGuid();
        Timestamp = DateTime.Now;
    }
}