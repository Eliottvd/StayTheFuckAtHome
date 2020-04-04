//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using WalkingDead.Models;

//namespace WalkingDead.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TestsController : ControllerBase
//    {
//        private readonly WalkingDeadContext _context;

//        public TestsController(WalkingDeadContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tests
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Test>>> GetWalkingDeadItems()
//        {
//            return await _context.Tests.ToListAsync();
//        }

//        // GET: api/Tests/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Test>> GetTest(long id)
//        {
//            var test = await _context.Tests.FindAsync(id);

//            if (test == null)
//            {
//                return NotFound();
//            }

//            return test;
//        }

//        // PUT: api/Tests/5
//        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
//        // more details see https://aka.ms/RazorPagesCRUD.
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutTest(long id, Test test)
//        {
//            if (id != test.Id)
//            {
//                return BadRequest();
//            }

//            _context.Entry(test).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!TestExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/Tests
//        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
//        // more details see https://aka.ms/RazorPagesCRUD.
//        [HttpPost]
//        public async Task<ActionResult<Test>> PostTest(Test test)
//        {
//            _context.Tests.Add(test);
//            await _context.SaveChangesAsync();

//            //return CreatedAtAction("GetTest", new { id = test.Id }, test);
//            return CreatedAtAction(nameof(GetTest), new { id = test.Id }, test);
//        }

//        // DELETE: api/Tests/5
//        [HttpDelete("{id}")]
//        public async Task<ActionResult<Test>> DeleteTest(long id)
//        {
//            var test = await _context.Tests.FindAsync(id);
//            if (test == null)
//            {
//                return NotFound();
//            }

//            _context.Tests.Remove(test);
//            await _context.SaveChangesAsync();

//            return test;
//        }

//        private bool TestExists(long id)
//        {
//            return _context.Tests.Any(e => e.Id == id);
//        }
//    }
//}
