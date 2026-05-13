using BuildingBlocks.ApiResponse;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BuildingBlocks.Exceptions.Handler
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            logger.LogError(exception, "An error occurred: {Message}", exception.Message);

            var (statusCode, response) = exception switch
            {
                ValidationException validationEx => (
                    StatusCodes.Status400BadRequest,
                    ApiResponse.Fail(validationEx.Message, StatusCodes.Status400BadRequest, validationEx.Errors)
                ),
                BadRequestException badRequestEx => (
                    StatusCodes.Status400BadRequest,
                    ApiResponse.Fail(badRequestEx.Message, StatusCodes.Status400BadRequest)
                ),
                NotFoundException notFoundEx => (
                    StatusCodes.Status404NotFound,
                    ApiResponse.Fail(notFoundEx.Message, StatusCodes.Status404NotFound)
                ),
                KeyNotFoundException keyNotFoundEx => (
                    StatusCodes.Status404NotFound,
                    ApiResponse.Fail(keyNotFoundEx.Message ?? "Resource not found.", StatusCodes.Status404NotFound)
                ),
                // Catch DomainException from any service that references the domain layer
                Exception ex when ex.GetType().Name == "DomainException" => (
                    StatusCodes.Status400BadRequest,
                    ApiResponse.Fail(ex.Message, StatusCodes.Status400BadRequest)
                ),
                _ => (
                    StatusCodes.Status500InternalServerError,
                    ApiResponse.Fail("An internal server error occurred.", StatusCodes.Status500InternalServerError)
                )
            };

            httpContext.Response.StatusCode = statusCode;
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsync(
                JsonSerializer.Serialize(response, JsonOptions),
                cancellationToken);

            return true;
        }
    }
}
