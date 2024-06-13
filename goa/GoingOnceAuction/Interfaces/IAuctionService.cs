using GoingOnceAuction.Models;

namespace GoingOnceAuction.Interfaces;
public interface IAuctionService: IDisposable {
    Task<Auction> StartAuctionAsync(Auction auction);
    Task<Bid> ProcessBid(string AuctionID, string UserId, int Amount);

}