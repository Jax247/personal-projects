
using GoingOnceAuction.Data;
using GoingOnceAuction.Models;
using GoingOnceAuction.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http.Features;
using System.Runtime.CompilerServices;

namespace GoingOnceAuction.Services;

// Facilitate the auction
// Place bids
// determinne winner
public class TransactionService(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : ITransactionService
{

    private readonly ApplicationDbContext _context = context;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    public async Task<Transaction> CreateTransaction(Guid AuctionId, Guid Buyer_Id, Guid Seller_Id, Item Item)
    {

        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // You can execute more data operations here and call SaveChanges multiple times if needed
                // Perform data modifications here

                // var buyer = _userManager.FindByIdAsync(Buyer_Id);
                _context.SaveChanges();



                // Commit transaction if all commands succeed

                // This is where I would process payment

                // Exchage Items between the users 
                // ExchangeItems();
                await new YieldAwaitable();
                // Set winner of auction
                // Alert users of completion




                Transaction res = new() { BuyerId = Buyer_Id, SellerId = Seller_Id, ItemId = Item.Id };
                _context.Transactions.Add(res);

                transaction.Commit();
                return res;
            }
            catch (Exception)
            {
                // Roll back the transaction if any operation fails
                transaction.Rollback();
                throw;
            }
        }
    }

    private void ExchangeItems(ApplicationUser Buyer, ApplicationUser Seller, Item item)
    {
        // Take item from Seller list
        // Update owner of item
        // Add to Buyer list 
    }
}