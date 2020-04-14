using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DataverseCustomerAPI.Data;
using DataverseCustomerAPI.Models;

namespace DataverseCustomerAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomersContext _context;
        private readonly IDataRepository<Customer> _repo;

        public CustomersController(CustomersContext context, IDataRepository<Customer> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: Customers
        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customers.OrderByDescending(c => c.CustID);
        }

        // GET: Customers/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer([FromRoute]int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

    

        
        // GET: Customers/Edit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer([FromRoute] int id, [FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != customer.CustID)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;


            try
            {
                _repo.Update(customer);
                var save = await _repo.SaveAsync(customer);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                
            }
            return NoContent();



        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> PostCustomer([FromBody] Customer customer)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _repo.Add(customer);
            var save = await _repo.SaveAsync(customer);
            return CreatedAtAction("GetCustomer", new { id = customer.CustID }, customer);
            
        }


        // POST: Customers/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            _repo.Delete(customer);

            var save = await _repo.SaveAsync(customer);

            return Ok(customer);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustID == id);
        }
    }
}
