using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WalkingDead.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WalkingDeadController : ControllerBase
    {

        private readonly ILogger<WalkingDeadController> _logger;

        public WalkingDeadController(ILogger<WalkingDeadController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("test")]
        public IActionResult test()
        {
            return Ok("coucou");
        }

        [HttpPost]
        [Route("addUserInfo/{username}")]
        public IActionResult addUserInfo(string username)
        {
            using(StreamReader reader = new StreamReader(Request.Body))
            {
                string json = reader.ReadToEndAsync().GetAwaiter().GetResult();
            }

            return Ok("coucou");
        }

        [HttpGet]
        [Route("getUserInfo/{username}")]
        public IActionResult getUserInfo(string username)
        {
            DateTime ret = DateTime.Now;

            return new JsonResult(ret);
        }
    }
}
