using Microsoft.AspNetCore.Http;
using Spotyplace.Entities.Core;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Xml.Linq;

namespace Spotyplace.Business.Utils
{
    public static class ImageHelper
    {
        /// <summary>
        /// Convert file to png.
        /// </summary>
        /// <param name="file">Input file</param>
        /// <returns></returns>
        public static ImageStreamInfo ConvertToPng(IFormFile file)
        {
            try
            {
                var image = Image.FromStream(file.OpenReadStream(), true, true);
                var newImageStream = new MemoryStream();
                image.Save(newImageStream, ImageFormat.Png);
                newImageStream.Position = 0;
                return new ImageStreamInfo
                {
                    Stream = newImageStream,
                    Width = image.Width,
                    Height = image.Height
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Check if file is svg.
        /// </summary>
        /// <param name="file">Input file.</param>
        /// <returns></returns>
        public static ImageStreamInfo IsValidSvg(IFormFile file)
        {
            try
            {
                var document = XDocument.Load(file.OpenReadStream());
                // TODO: check svg width and height from viewbox
                return new ImageStreamInfo
                {
                    Stream = null,
                    Width = 100,
                    Height = 100
                };
            }
            catch(Exception)
            {
                return null;
            }
        }
    }
}
