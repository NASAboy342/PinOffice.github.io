using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.WebSockets;
using System.Text;

namespace Pnut.WebsocketHelpers
{
    public class WebSocketServer
    {
        public WebSocketServer(WebSocket webSocket)
        {
            WebSocket = webSocket;
            Buffer = new byte[1024 * 4];
            ConnectionTimeSpend = TimeSpan.FromSeconds(0);
            ConnectionStartTimeUTC = DateTime.UtcNow;
        }

        public WebSocketServer(WebSocket webSocket, byte[] buffer)
        {
            WebSocket = webSocket;
            Buffer = buffer;
            ConnectionTimeSpend = TimeSpan.FromSeconds(0);
            ConnectionStartTimeUTC = DateTime.UtcNow;
        }

        public WebSocketServer(WebSocket webSocket, byte[] buffer, TimeSpan connectionTimeSpend)
        {
            WebSocket = webSocket;
            Buffer = buffer;
            ConnectionTimeSpend = connectionTimeSpend;
            ConnectionStartTimeUTC = DateTime.UtcNow;
        }

        public WebSocket WebSocket { get; set; }
        public byte[] Buffer { get; set; }
        public TimeSpan ConnectionTimeSpend { get; set; }
        public DateTime ConnectionStartTimeUTC { get; set; }

        public async Task Listener<TRequest, TResponse>(Func<TRequest, TResponse> textMessageHandler, Func<TResponse> updateHandler)
        {
            if (WebSocket.State == WebSocketState.Open)
            {
                var result = await WebSocket.ReceiveAsync(new ArraySegment<byte>(Buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    var receivedMessage = Encoding.UTF8.GetString(Buffer, 0, result.Count);
                    var resultFromHandler = textMessageHandler(JsonConvert.DeserializeObject<TRequest>(receivedMessage));
                    var responseMessage = JsonConvert.SerializeObject(resultFromHandler);
                    var responseBytes = Encoding.UTF8.GetBytes(responseMessage);
                    await WebSocket.SendAsync(
                        new ArraySegment<byte>(responseBytes, 0, responseBytes.Length),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None);
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
                }
            }
            while (WebSocket.State == WebSocketState.Open && ConnectionTimeSpend <= TimeSpan.FromMinutes(30))
            {
                await Task.Delay(TimeSpan.FromMilliseconds(10));
                ConnectionTimeSpend = DateTime.UtcNow - ConnectionStartTimeUTC;
                var responseFromHandler = updateHandler();
                var responseMessage = JsonConvert.SerializeObject(responseFromHandler);
                var responseBytes = Encoding.UTF8.GetBytes(responseMessage);
                await WebSocket.SendAsync(
                        new ArraySegment<byte>(responseBytes, 0, responseBytes.Length),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None);
            }
            await WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
        }
        public async Task ListenerTask<TRequest, TResponse>(Func<TRequest, Task<TResponse>> textMessageHandler, Func<Task<TResponse>> updateHandler)
        {
            if (WebSocket.State == WebSocketState.Open)
            {
                await MessageHandler<TRequest, TResponse>(textMessageHandler);
                await UpdateHandler<TRequest, TResponse>(textMessageHandler, updateHandler);
            }
            
            await WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
        }

        private async Task UpdateHandler<TRequest, TResponse>(Func<TRequest, Task<TResponse>> textMessageHandler, Func<Task<TResponse>> updateHandler)
        {
            while (WebSocket.State == WebSocketState.Open && ConnectionTimeSpend <= TimeSpan.FromMinutes(30))
            {
                try
                {
                    await MessageHandler<TRequest, TResponse>(textMessageHandler);
                    await Task.Delay(TimeSpan.FromMilliseconds(1));
                    ConnectionTimeSpend = DateTime.UtcNow - ConnectionStartTimeUTC;
                    var responseFromHandler = await updateHandler();
                    var responseMessage = JsonConvert.SerializeObject(responseFromHandler);
                    var responseBytes = Encoding.UTF8.GetBytes(responseMessage);
                    await WebSocket.SendAsync(
                            new ArraySegment<byte>(responseBytes, 0, responseBytes.Length),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None);
                }
                catch
                {

                }
                
            }
        }

        private async Task MessageHandler<TRequest, TResponse>(Func<TRequest, Task<TResponse>> textMessageHandler)
        {
            var result = await WebSocket.ReceiveAsync(new ArraySegment<byte>(Buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Text)
            {
                try
                {
                    var receivedMessage = Encoding.UTF8.GetString(Buffer, 0, result.Count);
                    Console.WriteLine($"| {receivedMessage} |");
                    var deserializedMessage = JsonConvert.DeserializeObject<TRequest>(receivedMessage);
                    var resultFromHandler = await textMessageHandler(deserializedMessage);
                    var responseMessage = JsonConvert.SerializeObject(resultFromHandler);
                    var responseBytes = Encoding.UTF8.GetBytes(responseMessage);
                    await WebSocket.SendAsync(
                        new ArraySegment<byte>(responseBytes, 0, responseBytes.Length),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None);
                }
                catch
                {
                }

            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                await WebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by server", CancellationToken.None);
            }
        }
    }
}
