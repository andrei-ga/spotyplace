using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Spotyplace.Business.Managers;
using Spotyplace.Entities.Models;

namespace Spotyplace.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly AccountManager _accountManager;

        public AccountController(AccountManager accountManager)
        {
            _accountManager = accountManager;
        }

        [Route("login")]
        public IActionResult Login(string returnUrl = "/account")
        {
            if (!Url.IsLocalUrl(returnUrl))
            {
                returnUrl = "/account";
            }

            return new ChallengeResult(GoogleDefaults.AuthenticationScheme, new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(LoginCallback), new { returnUrl })
            });
        }

        public async Task<IActionResult> LoginCallback(string returnUrl)
        {
            var authenticateResult = await HttpContext.AuthenticateAsync("Google");

            if (!authenticateResult.Succeeded)
            {
                return BadRequest();
            }

            var claimsIdentity = new ClaimsIdentity("Cookies");
            var emailClaim = authenticateResult.Principal.FindFirst(ClaimTypes.Email);
            var nameClaim = authenticateResult.Principal.FindFirst(ClaimTypes.NameIdentifier);

            claimsIdentity.AddClaim(nameClaim);
            claimsIdentity.AddClaim(emailClaim);

            await HttpContext.SignInAsync("Cookies", new ClaimsPrincipal(claimsIdentity));

            await _accountManager.CreateAccount(new ApplicationUser()
            {
                UserName = emailClaim.Value,
                Email = emailClaim.Value,
                FullName = User.Identity.Name,
                EmailConfirmed = true
            });

            return LocalRedirect(returnUrl);
        }

        [Authorize]
        [Route("logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(true);
        }

        [Authorize]
        [Route("info")]
        public async Task<IActionResult> AccountInfo()
        {
            return Ok(await _accountManager.GetAccountInfo(User.FindFirst(ClaimTypes.Email).Value));
        }
    }
}