using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Spotyplace.Entities.Core
{
    public class ImageStreamInfo
    {
        /// <summary>
        /// Image stream data.
        /// </summary>
        public Stream Stream;

        /// <summary>
        /// Image width.
        /// </summary>
        public int Width;

        /// <summary>
        /// Image height.
        /// </summary>
        public int Height;
    }
}
