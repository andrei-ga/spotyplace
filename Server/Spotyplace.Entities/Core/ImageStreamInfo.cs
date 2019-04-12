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
        public Stream Stream { get; set; }

        /// <summary>
        /// Image width.
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// Image height.
        /// </summary>
        public int Height { get; set; }
    }
}
