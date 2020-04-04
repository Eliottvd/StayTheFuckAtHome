using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WalkingDead.Models;

namespace WalkingDead.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WalkingDeadController : ControllerBase
    {

        private readonly ILogger<WalkingDeadController> _logger;
        public WalkindDBManager dBManager { get; set; }

        public WalkingDeadController(ILogger<WalkingDeadController> logger)
        {
            _logger = logger;
            dBManager = new WalkindDBManager();
        }

        [HttpGet]
        [Route("test")]
        public IActionResult test()
        {
            return Ok("coucou");
        }

        [HttpGet]
        [Route("getUserInfo/{username}")]
        public IActionResult getUserInfo(string username)
        {
            DateTime ret = DateTime.Now;

            return new JsonResult(ret);
        }

        [HttpGet]
        [Route("getInfectedMovements")]
        public IActionResult getInfectedMovements()
        {
            List<Movement> moves = (List<Movement>)dBManager.getInfectedMovement();

            return new JsonResult(moves);
        }

        [HttpPost]
        [Route("addTest")]
        public IActionResult AddTest(NewTestDTO request)
        {
            Console.WriteLine(request);

            dBManager.addTest(request);

            return Ok();
        }
    }
}
