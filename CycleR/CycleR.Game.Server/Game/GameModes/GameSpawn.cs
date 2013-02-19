using System;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class GameSpawn
    {
        public GameSpawn()
        {
        }

        public GameSpawn(Vector3 startPosition, Vector3 startVelocity, double startRotation)
        {
            StartPosition = startPosition;
            StartVelocity = startVelocity;
            StartRotation = startRotation;
        }

        public Vector3 StartPosition { get; set; }
        public Vector3 StartVelocity { get; set; }
        public double StartRotation { get; set; }
        public int TrailColor { get; set; }
    }
}
