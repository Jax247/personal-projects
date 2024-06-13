using GoingOnceAuction.Data;
using GoingOnceAuction.Services;
using Microsoft.AspNetCore.SignalR;


namespace GoingOnceAuction.Hubs;

public class AuctionHub : Hub
{
    AuctionService _auctionService;

    public AuctionHub(AuctionService auctionService)
    {
        _auctionService = auctionService;
    }

    public async Task SubmitBid(string AucionID, string UserId, int Amount)
    {
        // Process bid
        await _auctionService.ProcessBid(AucionID, UserId, Amount);
        // notify all clients connected in the grouop of the auction
        await Clients.Group($"Auction-{AucionID}").SendAsync("RecieveNewBid", UserId, Amount );

    }
}