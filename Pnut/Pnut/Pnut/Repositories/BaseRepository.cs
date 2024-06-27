using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

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
        public DataTable AsDataTable<T>(IEnumerable<T> items)
        {
            DataTable table = new DataTable();

            PropertyInfo[] properties = typeof(T).GetProperties();

            foreach (PropertyInfo prop in properties)
            {
                table.Columns.Add(prop.Name, prop.PropertyType);
            }

            foreach (T item in items)
            {
                DataRow row = table.NewRow();
                foreach (PropertyInfo prop in properties)
                {
                    row[prop.Name] = prop.GetValue(item);
                }
                table.Rows.Add(row);
            }

            return table;
        }

    }
}
