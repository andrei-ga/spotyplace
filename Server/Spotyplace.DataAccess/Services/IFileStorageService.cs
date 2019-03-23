using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
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
    }
}
