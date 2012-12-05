using System.Collections.Generic;

namespace Tron.GameServer
{
    public static class PayloadManager
    {
        private static PayloadCompressor _compressor = new PayloadCompressor();

        public static object[] BuildInitializationPayload(List<Cycle> cycles)
        {
            var compressedCycles = new List<object>(cycles.Count);

            foreach (Cycle cycle in cycles)
            {
                compressedCycles.Add(_compressor.Compress(cycle));
            }

            InitializationPayload payload = new InitializationPayload
            {
                Cycles = compressedCycles
            };

            return _compressor.Compress(payload);
        }

        public static object[] BuildMovementPayload(Cycle cycle, CycleMovementFlag direction)
        {
            MovementPayload payload = new MovementPayload
            {
                ID = cycle.ID,
                Direction = direction,
                Position = cycle.MovementController.Position
            };

            return _compressor.Compress(payload);
        }

        public static object GetCompressionContacts()
        {
            return _compressor.CompressionContracts();
        }
    }
}
