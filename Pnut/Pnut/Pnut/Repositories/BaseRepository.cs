using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace Pnut.Repositories
{
    public class BaseRepository
    {
        private readonly IConfiguration _configuration;
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public SqlConnection GetConnection()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            return new SqlConnection(connectionString);
        }

        public IEnumerable<T> GetData<T>(string storedProcedureName, object? request = null)where T : class
        {
            using(var connection = GetConnection())
            {
                return connection.Query<T>(storedProcedureName,request,null,true,null,CommandType.StoredProcedure);
            }
        }
    }
}
