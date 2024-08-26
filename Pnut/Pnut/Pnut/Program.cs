using Pnut.Repositories.Implementations;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Implementations;
using Pnut.Services.Interfacess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ITaskService, TaskService>();
builder.Services.AddSingleton<IPnutRepository, PnutRepository>();
builder.Services.AddSingleton<IGameProviderRepository, GameProviderRepository>();
builder.Services.AddSingleton<IFakerService, FakerService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IGroupService, GroupService>();


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                                 .AllowAnyMethod()
                                 .AllowAnyHeader();
                      });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
