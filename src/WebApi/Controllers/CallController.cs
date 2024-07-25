using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using WebApi.Hubs;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CallController : ControllerBase
{
    private readonly ILogger<CallController> _logger;
    private readonly IHubContext<MyHub, IMyClient> _hubContext;

    public CallController(ILogger<CallController> logger, IHubContext<MyHub, IMyClient> hubContext)
    {
        _logger = logger;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task CallThisToTriggerClientEvent()
    {
        await _hubContext.Clients.All.MyClientMethod1("This is a message from api");
    }
}
