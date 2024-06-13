using GoingOnceAuction.Models;

namespace GoingOnceAuction.DTO.Response;

public record ItemDTO(
    Item Item,
    bool Success
);