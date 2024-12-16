using Pnut.Cache.Popop;
using Pnut.Repositories.Implementations;
using Pnut.Repositories.Interfacess;
using Pnut.Services.Implementations;
using Pnut.Services.Interfacess;
using Pnut.Services.Popop;

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
builder.Services.AddSingleton<IGroupTaskService, GroupTaskService>();
builder.Services.AddSingleton<ISim1Service, Sim1Service>();
builder.Services.AddSingleton<IPopopService, PopopService>();
builder.Services.AddSingleton<PopopStatusCache>();

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
app.UseWebSockets();

app.MapControllers();

var popopStatusCache = app.Services.GetRequiredService<PopopStatusCache>();
Task.Run(() => popopStatusCache.Run());

app.Run();
