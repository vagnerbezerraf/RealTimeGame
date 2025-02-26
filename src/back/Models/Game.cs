namespace RealTimeGame.Models;
public class Game
{
    private List<Player> players = new List<Player>();
    private int currentPlayerIndex = 0;
    private const double MaxTime = 30.0;

    public void AddPlayer(string id, string name)
    {
        players.Add(new Player { Id = id, Name = name, AccumulatedTime = 0, IsActive = false });
    }

    public void StartGame()
    {
        if (players.Count > 0)
        {
            players[currentPlayerIndex].IsActive = true;
        }
    }

    public void PlayerClicked(string playerId, double timeTaken)
    {
        var player = players.FirstOrDefault(p => p.Id == playerId);
        if (player != null && player.IsActive)
        {
            player.AccumulatedTime += timeTaken;
            player.IsActive = false;

            if (player.AccumulatedTime > MaxTime)
            {
                players.Remove(player);
            }

            if (players.Count == 1)
            {
                players[0].IsWinner = true;
            }
            else
            {
                currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
                players[currentPlayerIndex].IsActive = true;
            }
        }
    }

    public List<Player> GetPlayers()
    {
        return players;
    }

    internal void RemovePlayer(string playerId)
    {
        players.Remove(players.FirstOrDefault(p => p.Id == playerId));
    }
}

