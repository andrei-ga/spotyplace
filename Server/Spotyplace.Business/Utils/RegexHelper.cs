using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Spotyplace.Business.Utils
{
    public static class RegexHelper
    {
        /// <summary>
        /// Check if given value has invalid characters. Return false if no special characters found.
        /// </summary>
        /// <param name="value">Input value.</param>
        /// <returns></returns>
        public static bool HasSpecialCharacters(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return false;
            }

            string pattern = "^[^*|\":<>[\\]{}`\\()';!@#&$%^+\\-_=/,.?]+$";
            return !Regex.IsMatch(value, pattern);
        }
    }
}
