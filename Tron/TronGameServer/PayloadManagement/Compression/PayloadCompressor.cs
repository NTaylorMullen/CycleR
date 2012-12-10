using System;

namespace Tron.GameServer
{
    public class PayloadCompressor
    {
        private InitializationPayloadCompressionContract _initializationPayloadCompressionContract = new InitializationPayloadCompressionContract();
        private MovementPayloadCompressionContract _movementPayloadCompressionContract = new MovementPayloadCompressionContract();
        private DeathPayloadCompressionContract _deathPayloadCompressionContract = new DeathPayloadCompressionContract();
        private CollidableCompressionContract _collidableCompressionContract = new CollidableCompressionContract();
        private CycleCompressionContract _cycleCompressionContract = new CycleCompressionContract();
        private CollisionPayloadCompressionContract _collisionCompressionContract = new CollisionPayloadCompressionContract();

        private void setCollidableContractMembers(object[] result, Collidable collidable)
        {
            result[_collidableCompressionContract.ID] = collidable.ID;
            result[_collidableCompressionContract.Alive] = Convert.ToInt16(collidable.Alive);
            result[_collidableCompressionContract.Position_X] = Math.Round(collidable.MovementController.Position.x, 2);
            result[_collidableCompressionContract.Position_Y] = Math.Round(collidable.MovementController.Position.y, 2);
            result[_collidableCompressionContract.Position_Z] = Math.Round(collidable.MovementController.Position.z, 2);
            result[_collidableCompressionContract.Velocity_X] = Math.Round(collidable.MovementController.Velocity.x, 2);
            result[_collidableCompressionContract.Velocity_Y] = Math.Round(collidable.MovementController.Velocity.y, 2);
            result[_collidableCompressionContract.Velocity_Z] = Math.Round(collidable.MovementController.Velocity.z, 2);
            result[_collidableCompressionContract.Rotation] = Math.Round(collidable.MovementController.Rotation, 2);
        }

        public object[] Compress(InitializationPayload payload)
        {
            object[] result = new object[1];

            result[_initializationPayloadCompressionContract.Cycles] = payload.Cycles;

            return result;
        }

        public object[] Compress(CollisionPayload payload)
        {
            object[] result = new object[4];

            result[_collisionCompressionContract.ID] = payload.ID;
            result[_collisionCompressionContract.CollidedAt_X] = Math.Round(payload.CollidedAt.x, 2);
            result[_collisionCompressionContract.CollidedAt_Y] = Math.Round(payload.CollidedAt.y, 2);
            result[_collisionCompressionContract.CollidedAt_Z] = Math.Round(payload.CollidedAt.z, 2);

            return result;
        }

        public object[] Compress(MovementPayload payload)
        {
            object[] result = new object[5];

            result[_movementPayloadCompressionContract.ID] = payload.ID;
            result[_movementPayloadCompressionContract.Direction] = payload.Direction.ToString();
            result[_movementPayloadCompressionContract.Position_X] = Math.Round(payload.Position.x, 2);
            result[_movementPayloadCompressionContract.Position_Y] = Math.Round(payload.Position.y, 2);
            result[_movementPayloadCompressionContract.Position_Z] = Math.Round(payload.Position.z, 2);

            return result;
        }

        public object[] Compress(DeathPayload payload)
        {
            object[] result = new object[4];

            result[_deathPayloadCompressionContract.ID] = payload.ID;
            result[_deathPayloadCompressionContract.DiedAt_X] = Math.Round(payload.DiedAt.x, 2);
            result[_deathPayloadCompressionContract.DiedAt_Y] = Math.Round(payload.DiedAt.y, 2);
            result[_deathPayloadCompressionContract.DiedAt_Z] = Math.Round(payload.DiedAt.z, 2);

            return result;
        }

        public object[] Compress(Cycle cycle)
        {
            object[] result = new object[10];

            setCollidableContractMembers(result, cycle);

            result[_cycleCompressionContract.TrailColor] = cycle.TrailColor;

            return result;
        }

        public object CompressionContracts()
        {
            return new
            {
                CollidableCompressionContract = _collidableCompressionContract,
                CycleCompressionContract = _cycleCompressionContract,
                InitializationCompressionContract = _initializationPayloadCompressionContract,
                MovementCompressionContract = _movementPayloadCompressionContract,
                DeathCompressionContract = _deathPayloadCompressionContract,
                CollisionCompressionContract = _collisionCompressionContract
            };
        }
    }
}
