using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"SELECT DepatmentID,DepartmentName FROM dbo.Depatments";
            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var commant = new SqlCommand(query, con);
            using (var da=new SqlDataAdapter(commant))
            {
                commant.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK,table);
        }
        public string Post(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Depatments values ('" + dep.DepartmentName + @"')";

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to add";
            }

        }
        public string Put(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Depatments set DepartmentName='" + dep.DepartmentName +
                    @"' where  DepatmentID=" + dep.DepatmentID + @"
                    ";

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Updated succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to update";
            }
        }
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"delete from dbo.Depatments where DepatmentID = " + id;

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to delete";
            }
        }
    }
}
