using Microsoft.EntityFrameworkCore;

namespace GoingOnceAuction.Models;

public class Item
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OwnerId { get; set; }
    public ApplicationUser Owner { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public ICollection<string> ImageUrls { get; set; } = [];
    public ICollection<string> Tags { get; set; } = [];
    public string? Category { get; set; }
    public int StartingPrice { get; set; }
    public ITEM_STATUS Status { get; set; } = ITEM_STATUS.UNAVAILABLE;
    public Transaction? LastTransaction { get; set; }
}
public enum ITEM_STATUS
{
    SOLD,
    AVAILABLE,
    PENDING,
    LISTED,
    OWNED,
    UNAVAILABLE
}