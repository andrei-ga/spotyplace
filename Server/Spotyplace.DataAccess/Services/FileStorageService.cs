using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Spotyplace.Entities.Config;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Services
{
    public class FileStorageService : IFileStorageService
    {
        private IAmazonS3 _s3Client { get; set; }
        private readonly UploadOptions _uploadOptions;

        public FileStorageService(IAmazonS3 s3Client, IOptionsMonitor<UploadOptions> uploadOptions)
        {
            _s3Client = s3Client;
            _uploadOptions = uploadOptions.CurrentValue;
        }

        public async Task<bool> UploadFileAsync(IFormFile file, string fileName)
        {
            try
            {
                var transferUtility = new TransferUtility(_s3Client);
                await transferUtility.UploadAsync(file.OpenReadStream(), _uploadOptions.BucketName, string.Format("{0}{1}", _uploadOptions.BasePath, fileName));
            }
            catch(Exception)
            {
                return false;
            }
            return true;
        }
    }
}
