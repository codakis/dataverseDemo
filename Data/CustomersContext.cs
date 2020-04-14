using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataverseCustomerAPI.Models;

namespace DataverseCustomerAPI.Data
{
    public class CustomersContext : DbContext
    {
        public CustomersContext (DbContextOptions<CustomersContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
