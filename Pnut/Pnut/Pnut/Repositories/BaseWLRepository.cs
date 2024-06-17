using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace Pnut.Repositories
{
    public class BaseWLRepository
    {
        public virtual string ConnectionString()
        {
            return "";
        }
        public SqlConnection GetConnection()
        {
            var connectionString = ConnectionString();
            return new SqlConnection(connectionString);
        }

        public IEnumerable<T> GetData<T>(string storedProcedureName, object? request = null) where T : class
        {
            using (var connection = GetConnection())
            {
                return connection.Query<T>(storedProcedureName, request, null, true, null, CommandType.StoredProcedure);
            }
        }
    }
}
