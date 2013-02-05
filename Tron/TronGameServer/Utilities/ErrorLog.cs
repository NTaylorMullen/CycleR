using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Tron.Utilities
{
    public class ErrorLog
    {
        private readonly static Lazy<ErrorLog> _instance = new Lazy<ErrorLog>(() => new ErrorLog());

        EventLog elog = new EventLog();
        string sSource = ".NET Runtime";

        public void Log(Exception e, string customMessage = "")
        {
            throw e;
            /*
            Task.Factory.StartNew(() =>
            {
                EventLog.WriteEntry(sSource, e.ToString() + "      CALLSTACK: " + e.StackTrace + "      CUSTOM MESSAGE: " + customMessage);
            });*/
        }

        public static ErrorLog Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}