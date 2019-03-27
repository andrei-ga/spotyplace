using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Business.Utils
{
    public static class ConcatHelper
    {
        public static string GetFloorFileName(Guid locationId, Guid floorId, bool isSvg)
        {
            return string.Format("{0}/{1}{2}", locationId.ToString(), floorId.ToString(), isSvg ? ".svg" : ".jpg");
        }
    }
}
