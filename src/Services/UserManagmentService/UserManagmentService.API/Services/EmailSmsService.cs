using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using UserManagmentService.Domain.Interfaces;

namespace UserManagmentService.Infrastructure.Services
{
    public class EmailSmsService : IEmailSmsService
    {
        private readonly ILogger<EmailSmsService> _logger;

        public EmailSmsService(ILogger<EmailSmsService> logger)
        {
            _logger = logger;
        }

        public Task SendEmailConfirmationAsync(string email, string token)
        {
            var message = $"[EMAIL MOCK] Sending email confirmation to {email}. Token/Link: http://localhost:7002/api/auth/confirm-email?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(token)}";
            _logger.LogInformation(message);
            Console.WriteLine(message);
            return Task.CompletedTask;
        }

        public Task SendPhoneConfirmationAsync(string phoneNumber, string token)
        {
            var message = $"[SMS MOCK] Sending SMS confirmation to {phoneNumber}. Code: {token}";
            _logger.LogInformation(message);
            Console.WriteLine(message);
            return Task.CompletedTask;
        }

        public Task SendPasswordResetAsync(string email, string token)
        {
            var message = $"[EMAIL MOCK] Sending password reset link to {email}. Token/Link: http://localhost:7002/api/auth/reset-password?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(token)}";
            _logger.LogInformation(message);
            Console.WriteLine(message);
            return Task.CompletedTask;
        }
    }
}
