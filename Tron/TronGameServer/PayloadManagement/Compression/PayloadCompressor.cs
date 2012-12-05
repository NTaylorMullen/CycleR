using System;

namespace Tron.GameServer
{
    public class PayloadCompressor
    {
        private InitializationPayloadCompressionContract _initializationPayloadCompressionContract = new InitializationPayloadCompressionContract();
        private MovementPayloadCompressionContract _movementPayloadCompressionContract = new MovementPayloadCompressionContract();
        private CollidableCompressionContract _collidableCompressionContract = new CollidableCompressionContract();
        private CycleCompressionContract _cycleCompressionContract = new CycleCompressionContract();

        private void setCollidableContractMembers(object[] result, Collidable collidable)
        {
            result[_collidableCompressionContract.ID] = collidable.ID;
            result[_collidableCompressionContract.Alive] = Convert.ToInt16(collidable.Alive);
            result[_collidableCompressionContract.Collided] = Convert.ToInt16(collidable.Collided);
            result[_collidableCompressionContract.CollidedAt_X] = Math.Round(collidable.CollidedAt.x, 2);
            result[_collidableCompressionContract.CollidedAt_Y] = Math.Round(collidable.CollidedAt.y, 2);
            result[_collidableCompressionContract.CollidedAt_Z] = Math.Round(collidable.CollidedAt.z, 2);
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

        public object[] Compress(Cycle cycle)
        {
            object[] result = new object[15];

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
                InitializationPayloadCompressionContract = _initializationPayloadCompressionContract,
                MovementPayloadCompressionContract = _movementPayloadCompressionContract
            };
        }
    }
}
