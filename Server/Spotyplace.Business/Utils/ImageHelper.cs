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
        /// Convert image file.
        /// </summary>
        /// <param name="file">Input file</param>
        /// <param name="format">Image format to convert into.</param>
        /// <returns></returns>
        public static ImageStreamInfo ConvertImage(IFormFile file, ImageFormat format)
        {
            try
            {
                var image = Image.FromStream(file.OpenReadStream(), true, true);
                var newImageStream = new MemoryStream();
                image.Save(newImageStream, format);
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
                var svg = document.Root;
                var viewBox = ((string)svg.Attribute("viewBox")).Split(' ');
                return new ImageStreamInfo
                {
                    Stream = null,
                    Width = (int)float.Parse(viewBox[2]),
                    Height = (int)float.Parse(viewBox[3])
                };
            }
            catch(Exception)
            {
                return null;
            }
        }
    }
}
