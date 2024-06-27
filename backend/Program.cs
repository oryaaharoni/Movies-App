using backend.Repository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(sp => new DataRepository("data.json"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(option=> option.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

// app.UseHttpsRedirection();


app.Run();


