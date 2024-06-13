


using Microsoft.AspNetCore.Mvc;
using GoingOnceAuction.Models;
using GoingOnceAuction.Data;
using GoingOnceAuction.DTO.Request;
using Microsoft.EntityFrameworkCore;
using GoingOnceAuction.Mapper;
using GoingOnceAuction.Client.Pages;
using System.Collections;

namespace GoingOnceAuction.Controllers;

[ApiController]
[Route("api/items/")]
public class ItemContoller(ApplicationDbContext context) : ControllerBase
{

    private readonly ApplicationDbContext _context = context;

    [HttpGet("health")]
    public ActionResult Health()
    {




        return Ok("200");
    }

    [HttpPost("create-item")]
    public IActionResult CreateItem([FromBody] CreateItemRequest req)
    {

        if (req == null)
        {
            return BadRequest("No Item Presented");
        }

        Item item = new()
        {
            Name = req.Name,
            Description = req.Description,
            OwnerId = req.UserId,
            StartingPrice = req.StartingPrice
        };

        _context.Items.Add(item);

        _context.SaveChanges();
        return Ok(item);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItemByIdAsync(Guid id)
    {
        var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id);

        if (item == null)
        {
            return BadRequest("Item not found");
        }

        return item;
    }
    [HttpGet("all")]
    public async Task<IActionResult> GetItemsAsync()
    {
        List<Item> items = await _context.Items.ToListAsync();

        Console.WriteLine("Items: " + items);
        if (items == null || items!.Count == 0)
        {
            return BadRequest("Item not found");
        }

        return Ok(items);
    }
}