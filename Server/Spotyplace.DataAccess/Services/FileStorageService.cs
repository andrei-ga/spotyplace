using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Spotyplace.Entities.Config;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Spotyplace.DataAccess.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly ILogger _logger;
        private IAmazonS3 _s3Client { get; set; }
        private readonly UploadOptions _uploadOptions;

        public FileStorageService(IAmazonS3 s3Client, IOptionsMonitor<UploadOptions> uploadOptions, ILogger<FileStorageService> logger)
        {
            _s3Client = s3Client;
            _uploadOptions = uploadOptions.CurrentValue;
            _logger = logger;
        }

        public async Task<bool> UploadFileAsync(IFormFile file, string fileName)
        {
            return await UploadFileAsync(file.OpenReadStream(), fileName);
        }

        public async Task<bool> UploadFileAsync(Stream stream, string fileName)
        {
            try
            {
                var transferUtility = new TransferUtility(_s3Client);
                await transferUtility.UploadAsync(stream, _uploadOptions.BucketName, string.Format("{0}{1}", _uploadOptions.BasePath, fileName));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
            return true;
        }

        public async Task<Stream> ReadFileAsync(string fileName, CancellationToken cancellationToken = default)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = _uploadOptions.BucketName,
                    Key = string.Format("{0}{1}", _uploadOptions.BasePath, fileName)
                };

                using (var response = await _s3Client.GetObjectAsync(request, cancellationToken))
                using (var responseStream = response.ResponseStream)
                {
                    var stream = new MemoryStream();
                    await responseStream.CopyToAsync(stream);
                    stream.Position = 0;
                    return stream;
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task DeleteFileAsync(string fileName)
        {
            try
            {
                var request = new DeleteObjectRequest
                {
                    BucketName = _uploadOptions.BucketName,
                    Key = string.Format("{0}{1}", _uploadOptions.BasePath, fileName)
                };

                await _s3Client.DeleteObjectAsync(request);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
