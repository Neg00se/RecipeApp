using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using RecipeAppClassLibrary.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policy =>
{
	policy.AddPolicy("CorsPolicy", opt =>
	opt.WithOrigins("http://localhost:3000")
	.AllowAnyMethod()
	.AllowAnyHeader()
	.AllowCredentials());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddMicrosoftIdentityWebApi(options =>
	{
		builder.Configuration.Bind("AzureAdB2C", options);
		options.TokenValidationParameters.NameClaimType = "name";
	},
	options => { builder.Configuration.Bind("AzureAdB2C", options); });

builder.Services.AddDbContext<RecipeAppDbContext>(options => options.UseSqlServer(
	   builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
