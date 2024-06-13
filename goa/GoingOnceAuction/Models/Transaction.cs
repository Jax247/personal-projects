using Microsoft.EntityFrameworkCore;

namespace GoingOnceAuction.Models;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ItemId { get; set; }
    public Item Item { get; set; }
    public Guid SellerId { get; set; }
    public ApplicationUser Seller { get; set; }
    public Guid BuyerId { get; set; }
    public ApplicationUser Buyer{ get; set; }
    public int Amount { get; set; }
    public DateTime TransactionTime { get; set; } = DateTime.Now;
}