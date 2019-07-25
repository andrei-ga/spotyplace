using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Services
{
    public interface IFileStorageService
    {
        /// <summary>
        /// Upload file.
        /// </summary>
        /// <param name="file">File to upload.</param>
        /// <param name="fileName">Filename.</param>
        /// <returns></returns>
        Task<bool> UploadFileAsync(IFormFile file, string fileName);

        /// <summary>
        /// Upload file.
        /// </summary>
        /// <param name="stream">Stream of file to upload.</param>
        /// <param name="fileName">Filename.</param>
        /// <returns></returns>
        Task<bool> UploadFileAsync(Stream stream, string fileName);

        /// <summary>
        /// Read file.
        /// </summary>
        /// <param name="fileName">Filename.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns></returns>
        Task<Stream> ReadFileAsync(string fileName, CancellationToken cancellationToken = default);

        /// <summary>
        /// Delete file.
        /// </summary>
        /// <param name="fileName">Filename.</param>
        /// <returns></returns>
        Task DeleteFileAsync(string fileName);
    }
}
