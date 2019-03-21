using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Spotyplace.Business.Utils
{
    public static class ImageHelper
    {
        public static Stream ConvertToPng(IFormFile file)
        {
            try
            {
                var image = Image.FromStream(file.OpenReadStream(), true, true);
                var newImageStream = new MemoryStream();
                image.Save(newImageStream, ImageFormat.Png);
                newImageStream.Position = 0;
                return newImageStream;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
