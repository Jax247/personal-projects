using GoingOnceAuction.Models;
using Microsoft.AspNetCore.Http.Features;

namespace GoingOnceAuction.Interfaces;
public interface ITransactionService {
    Task<Transaction> CreateTransaction(Guid AuctionId, Guid Buyer_Id, Guid Seller_Id, Item item);

}