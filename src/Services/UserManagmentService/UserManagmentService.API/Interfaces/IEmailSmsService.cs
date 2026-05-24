using System.Threading.Tasks;

namespace UserManagmentService.Domain.Interfaces
{
    public interface IEmailSmsService
    {
        Task SendEmailConfirmationAsync(string email, string token);
        Task SendPhoneConfirmationAsync(string phoneNumber, string token);
        Task SendPasswordResetAsync(string email, string token);
    }
}
