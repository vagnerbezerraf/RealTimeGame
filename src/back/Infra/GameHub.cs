using Microsoft.AspNetCore.SignalR;
using RealTimeGame.Models;

public class GameHub : Hub
{
    private readonly Game game;
    private readonly ILogger<GameHub> logger;
    private readonly int PLYERS_TO_START = 2;

    public GameHub(Game game, ILogger<GameHub> logger)
    {
        this.game = game;
        this.logger = logger;
    }

    public async Task JoinGame(string playerName)
    {
        try
        {
            var playerId = Context.ConnectionId;
            game.AddPlayer(playerId, playerName);
            logger.LogInformation("Player {PlayerName} with ID {PlayerId} joined the game.", playerName, playerId);

            await Clients.All.SendAsync("PlayerJoined", game.GetPlayers());

            if (game.GetPlayers().Count == PLYERS_TO_START)
            {
                game.StartGame();
                await Clients.All.SendAsync("GameStateUpdated", game.GetPlayers());
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while a player was joining the game.");
            throw;
        }
    }

    public async Task PlayerClicked(double timeTaken)
    {
        try
        {
            var playerId = Context.ConnectionId;
            game.PlayerClicked(playerId, timeTaken);
            logger.LogInformation("Player with ID {PlayerId} clicked in {TimeTaken} seconds.", playerId, timeTaken);
            await Clients.All.SendAsync("GameStateUpdated", game.GetPlayers());
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while processing a player's click.");
            throw;
        }
    }
}

