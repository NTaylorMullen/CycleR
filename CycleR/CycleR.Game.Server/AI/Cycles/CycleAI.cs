using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;

namespace CycleR.Game.Server.AI
{
    public class CycleAI : Cycle
    {
        private static readonly TimeSpan RAND_TURN_AFTER = TimeSpan.FromSeconds(4);
        private static Random _gen = new Random();

        private Map _map;
        private DateTime _lastRandTurn;

        public CycleAI(long id, Vector3 startPosition, Vector3 startVelocity, double startRotation, int trailColor, Map map, GameConfiguration gameConfiguration)
            : base(id, startPosition, startVelocity, startRotation, trailColor, map, gameConfiguration)
        {
            _map = map;
            _lastRandTurn = DateTime.UtcNow;
        }        

        private void TurnRandomly(GameTime gameTime)
        {
            List<MovementFlag> possibleMoves = MovementController.GetValidMovements();

            if (possibleMoves.Count != 0)
            {
                MovementFlag movement = possibleMoves[_gen.Next(possibleMoves.Count - 1)];
                base.RegisterMove(movement);
                _lastRandTurn = gameTime.Now;
            }
        }

        public override void Update(GameTime gameTime)
        {
            // We've run into a wall
            if (MovementController.Velocity.IsZero() || gameTime.Now - _lastRandTurn > RAND_TURN_AFTER)
            {
                TurnRandomly(gameTime);
            }

            base.Update(gameTime);
        }
    }
}
