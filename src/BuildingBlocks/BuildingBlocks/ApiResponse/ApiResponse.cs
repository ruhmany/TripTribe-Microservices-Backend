namespace BuildingBlocks.ApiResponse
{
    public class ApiResponse<T>
    {
        public bool IsSuccess { get; init; }
        public int StatusCode { get; init; }
        public string Message { get; init; } = string.Empty;
        public T? Data { get; init; }
        public List<string>? Errors { get; init; }
        public DateTime Timestamp { get; init; }

        public static ApiResponse<T> Success(T data, string message, int statusCode = 200)
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                StatusCode = statusCode,
                Message = message,
                Data = data,
                Errors = null,
                Timestamp = DateTime.UtcNow
            };
        }

        public static ApiResponse<T> Fail(string message, int statusCode, List<string>? errors = null)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                StatusCode = statusCode,
                Message = message,
                Data = default,
                Errors = errors ?? new List<string> { message },
                Timestamp = DateTime.UtcNow
            };
        }
    }

    /// <summary>
    /// Non-generic variant for endpoints that return no data (e.g., delete, no-content operations).
    /// </summary>
    public class ApiResponse : ApiResponse<object>
    {
        public static ApiResponse Success(string message, int statusCode = 200)
        {
            return new ApiResponse
            {
                IsSuccess = true,
                StatusCode = statusCode,
                Message = message,
                Data = null,
                Errors = null,
                Timestamp = DateTime.UtcNow
            };
        }

        public static new ApiResponse Fail(string message, int statusCode, List<string>? errors = null)
        {
            return new ApiResponse
            {
                IsSuccess = false,
                StatusCode = statusCode,
                Message = message,
                Data = null,
                Errors = errors ?? new List<string> { message },
                Timestamp = DateTime.UtcNow
            };
        }
    }
}
