namespace GoingOnceAuction.DTO;

public record ItemDto{
    Guid Id { get; set; }
    Guid UserId { get; set; }
    string Name { get; set; }
    string Description { get; set; }
    string Category { get; set; }
    int StartingPrice { get; set; }
    List<string>? ImageLinks { get; set; }
    List<string>? Tags { get; set;}
};