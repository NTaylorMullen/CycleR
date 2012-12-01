using System.Collections.Generic;

namespace Tron.GameServer
{
    public static class PayloadManager
    {
        private static PayloadCompressor _compressor = new PayloadCompressor();

        public static object[] BuildPayload(List<Cycle> cycles)
        {
            var compressedCycles = new List<object>(cycles.Count);

            foreach (Cycle cycle in cycles)
            {
                compressedCycles.Add(_compressor.Compress(cycle));
            }

            Payload payload = new Payload
            {
                Cycles = compressedCycles
            };

            return _compressor.Compress(payload);
        }

        public static object GetCompressionContacts()
        {
            return _compressor.CompressionContracts();
        }
    }
}
