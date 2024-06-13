
using GoingOnceAuction.Data;
using GoingOnceAuction.Models;
using GoingOnceAuction.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace GoingOnceAuction.Services;

// Facilitate the auction
// Place bids
// determinne winner
public class AuctionService(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : IAuctionService
{

    private readonly ApplicationDbContext _context = context;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    public async Task<Auction> StartAuctionAsync(Auction auction)
    {
        // set Timer

        // flag as in Session
        auction.IsInSession = true;
        // Add to DB
        _context.Auctions.Add(auction);
        await _context.SaveChangesAsync();
        return auction;
    }

    public async Task<Bid> ProcessBid(string AuctionID, string UserId, int BidAmount)
    {
        // Considerations
        // Bid must be greater than current max 
        // Auction must be inSession
        // If time is within last 5 minutes, extend time by 5 minutes
        // Steps
        // Find auction in db via Id


        bool isAIDGuid = Guid.TryParse(AuctionID, out Guid A_ID);
        bool isUIDGuid = Guid.TryParse(UserId, out Guid U_ID);

        if (!isAIDGuid || !isUIDGuid)
        {
            Console.WriteLine("Format the ids mf");
        }

        var auction = _context.Auctions
                            .Include(a => a.Bids)
                            .FirstOrDefault(a => a.Id == A_ID);

        var user = await _userManager.FindByIdAsync(UserId);

        if (user == null)
        {
            Console.WriteLine("User doesn't exist");
        }
        if (auction == null)
        {
            Console.WriteLine("Auction doesn't exist");
        }
        // check if auction is inSession

        if (auction!.IsInSession == false)
        {
            Console.WriteLine("Auction is not in session");
        }
        // check if amount is greater than current max

        if (BidAmount < auction.CurrentTopBid.Amount + auction.MinimumBidIncrement)
        {
            Console.WriteLine("Not enough Bread fam");

        }

        // check time to check whether or not an extension is necessary
        // If the timespan resulting from subtracting now to end of auction 
        // is less than the overtime threshold , reset time to threshold 

        TimeSpan timeLeft = DateTime.Now - auction.AuctionEndTime;

        if (timeLeft < auction.OvertimeThreshold)
        {
            Console.WriteLine("Extenstion necessary");
            auction.AuctionEndTime += auction.OvertimeThreshold;
        }

        // create bid with data and log in auction

        Bid newBid = new() { AuctionId = A_ID, ItemId = A_ID, BidderId = U_ID, Amount = BidAmount };

        auction.Bids.Add(newBid);
        auction.CurrentTopBid = newBid;

        await _context.SaveChangesAsync();

        return newBid;

    }
    public void Dispose()
    {
        // Clean up and Save Auction Times here
        return;
    }

}