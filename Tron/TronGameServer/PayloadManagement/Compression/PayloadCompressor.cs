using System;

namespace Tron.GameServer
{
    public class PayloadCompressor
    {
        private PayloadCompressionContract _payloadCompressionContract = new PayloadCompressionContract();
        private CollidableCompressionContract _collidableCompressionContract = new CollidableCompressionContract();

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

        public object[] Compress(Payload payload)
        {
            object[] result = new object[1];

            result[_payloadCompressionContract.Cycles] = payload.Cycles;

            return result;
        }

        public object[] Compress(Cycle cycle)
        {
            object[] result = new object[13];

            setCollidableContractMembers(result, cycle);

            return result;
        }

        public object CompressionContracts()
        {
            return new
            {
                CollidableCompressionContract = _collidableCompressionContract,
                PayloadCompressionContract = _payloadCompressionContract
            };
        }
    }
}
