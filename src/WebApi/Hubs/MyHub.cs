using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs;

public class MyHub : Hub<IMyClient>
{
    public async Task MyHubMethod1()
    {
        await Clients.All.MyClientMethod1($"You called MyHubMethod1. Id {Guid.NewGuid()}");
    }

    public async Task MyHubMethod2(string message)
    {
        await Clients.All.MyClientMethod2(new(Guid.NewGuid(), $"You passed message {message}"));
    }
}

public interface IMyClient
{
    Task MyClientMethod1(string message);

    Task MyClientMethod2(MyContract myContract);
}

public record MyContract(Guid Id, string Message);