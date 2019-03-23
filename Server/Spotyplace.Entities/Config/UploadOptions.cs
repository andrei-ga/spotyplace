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

        /// <summary>
        /// Upload bucket name.
        /// </summary>
        public string BucketName { get; set; }

        /// <summary>
        /// Upload base path.
        /// </summary>
        public string BasePath { get; set; }

        public UploadOptions()
        {
            MaxFileSize = 1024 * 500;
        }
    }
}
