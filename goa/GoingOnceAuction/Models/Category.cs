namespace GoingOnceAuction.Models;

public class Category
{
    public Guid CategoryId { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string[] ImageUrls { get; set; } = [];

    public ICollection<Item> Items { get; set; } = [];
    public ICollection<Guid> SubCategories { get; set; } = [];
}
