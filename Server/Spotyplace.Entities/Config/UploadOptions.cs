using System;
using System.Collections.Generic;
using System.Text;

namespace Spotyplace.Entities.Config
{
    public class UploadOptions
    {
        /// <summary>
        /// Max file size user can upload.
        /// </summary>
        public int MaxFileSize { get; set; }

        public UploadOptions()
        {
            MaxFileSize = 1024 * 500;
        }
    }
}
