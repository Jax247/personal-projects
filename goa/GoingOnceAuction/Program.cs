using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using GoingOnceAuction.Client.Pages;
using GoingOnceAuction.Components;
using GoingOnceAuction.Components.Account;
using GoingOnceAuction.Data;
using GoingOnceAuction.Models;
using GoingOnceAuction.Services;
using GoingOnceAuction.Hubs;
using Quartz;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using GoingOnceAuction.Scheduler;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<IdentityUserAccessor>();
builder.Services.AddScoped<IdentityRedirectManager>();
builder.Services.AddScoped<AuthenticationStateProvider, PersistingRevalidatingAuthenticationStateProvider>();
builder.Services.AddScoped<AuctionService>();
builder.Services.AddScoped<AuctionHub>();
builder.Services.AddSignalR();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = IdentityConstants.ApplicationScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddIdentityCookies();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite(connectionString)
    );
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityCore<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();


builder.Services.AddSingleton<IEmailSender<ApplicationUser>, IdentityNoOpEmailSender>();

builder.Services.AddQuartz(q =>
        {
            // Define auctin job detail
            var jobKey = new JobKey("AuctionCloseJob");
            q.AddJob<AuctionCloseJob>(opts => opts.WithIdentity(jobKey));

            // Define a trigger for the job
            q.AddTrigger(opts => opts
                .ForJob(jobKey) // Associate with the above job
                .WithIdentity("AuctionCloseJob")); // Give the trigger a unique identity
        }
);

builder.Services.AddQuartzHostedService(q =>
    {
        // Automatically start the scheduler
        q.WaitForJobsToComplete = true;
    });

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapControllers();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(Counter).Assembly);

app.MapHub<AuctionHub>("/auctionHub");


// Add additional endpoints required by the Identity /Account Razor components.
app.MapAdditionalIdentityEndpoints();

app.Run();
