using APinI.Models;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace APinI.Repository
{
    public class PinDataRepository
    {
        private SqlConnection SqlConnection()
        {
            return new SqlConnection("Server=KH-NB042;Database=PinData;User Id=sa;Password=123;");
        }
        private IDbConnection GetConnection => SqlConnection();
        public IEnumerable<T> GetData<T>(string spName)
        {
            GetConnection.Open();
            var data = GetConnection.Query<T>(spName, null,null,true,null,CommandType.StoredProcedure);
            GetConnection.Close();
            return data;
        }
        public IEnumerable<T> GetData<T>(string spName,object param)
        {
            GetConnection.Open();
            var data = GetConnection.Query<T>(spName, param, null, true, null, CommandType.StoredProcedure);
            GetConnection.Close();
            return data;
        }
        internal List<GetAllTaskResponse> GetAllTask()
        {
            return GetData<GetAllTaskResponse>("GetAllTask").ToList();
        }
        internal List<GetAllTaskResponse> GetAllTask(GetAllTaskReques req)
        {
            return GetData<GetAllTaskResponse>("GetAllTaskByStatus",new
            {
                req.Status
            }).ToList();
        }
    }
}
