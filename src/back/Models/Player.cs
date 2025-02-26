namespace RealTimeGame.Models;
public class Player
{
    public string Id { get; set; }
    public string Name { get; set; }
    public double AccumulatedTime { get; set; }
    public bool IsActive { get; set; }
    public bool IsWinner { get; set; }
}
