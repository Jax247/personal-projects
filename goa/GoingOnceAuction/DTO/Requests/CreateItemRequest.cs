namespace GoingOnceAuction.DTO.Request;

public record CreateItemRequest(
    Guid UserId,
    string Name,
    string Description,
    string Category,
    int StartingPrice,
    List<string>? ImageLinks,
    List<string>? Tags
);