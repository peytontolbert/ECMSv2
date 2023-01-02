using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using SQLclient;
using System.Reflection.Emit;
using System.Runtime.Intrinsics.X86;
using System.Web.Http.Cors;
using System.Web.Http;

namespace test
{
    class Program
    {
        public static string GenerateAccessToken()
        {
            // Use a random number generator to generate a random token
            Random random = new Random();
            int token = random.Next(1000000, 9999999);

            // Return the token as a string
            return token.ToString();
        }
        static async Task Main(string[] args)
        {
            MongoClient dbClient = new MongoClient("mongodb://localhost:27017");

            var database = dbClient.GetDatabase("sample-users");
            var collection = database.GetCollection<BsonDocument>("users");
            var democollection = database.GetCollection<BsonDocument>("demosystems");

            var listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:8000/");

            listener.Start();

            Console.WriteLine("Listening for requests on http://localhost:8000");

            while (true)
            {
                var context = await listener.GetContextAsync();

                var request = context.Request;
                var response = context.Response;
                Console.WriteLine(request.HttpMethod);
                if (request.HttpMethod == "OPTIONS")
                {
                    response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
                    response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                    response.AddHeader("Access-Control-Max-Age", "1728000");
                }

                response.AddHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                response.AddHeader("Access-Control-Allow-Credentials", "true");
                // Check the request method and URL
                if (request.HttpMethod == "POST" && request.RawUrl == "/api/register")
                {

                    Console.WriteLine("register initiated");
                    // Handle the register request
                    await HandleRegisterRequest(request, response, collection);
                }
                else if (request.HttpMethod == "POST" && request.RawUrl == "/api/login")
                {
                    Console.WriteLine("logging in");
                    await HandleLoginRequest(request, response, collection);
                }
                else
                {
                    // Return a default response for other requests
                    var responseString = "Hello, world!";
                    var buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
                    response.ContentLength64 = buffer.Length;
                    var responseOutput = response.OutputStream;
                    await responseOutput.WriteAsync(buffer, 0, buffer.Length);

                    // Close the response and request streams
                    responseOutput.Close();
                }

                request.InputStream.Close();
            }
        }
        private static async Task HandleLoginRequest(HttpListenerRequest request, HttpListenerResponse response, IMongoCollection<BsonDocument> collection)
        {
            // Read the request body
            using (var requestStream = request.InputStream)
            using (var reader = new StreamReader(requestStream))
            {
                var requestBody = await reader.ReadToEndAsync();

                // Parse the request data
                var data = BsonSerializer.Deserialize<RegisterRequest>(requestBody);
                Console.WriteLine(data.Username);

                // Check if the username and password is correct
                var user = collection.Find(u => u["Username"] == data.Username && u["Password"] == data.Password).FirstOrDefault();
                if (user == null)
                {
                    Console.WriteLine("invalid login entered");
                    var responseString = "invalid username or password";
                    var newbuffer = System.Text.Encoding.UTF8.GetBytes(responseString);
                    response.ContentLength64 = newbuffer.Length;
                    var newresponseOutput = response.OutputStream;
                    await newresponseOutput.WriteAsync(newbuffer, 0, newbuffer.Length);
                    newresponseOutput.Close();
                    Console.WriteLine("Login failure");
                    return;
                }
                Console.WriteLine("login success");
                string Token = GenerateAccessToken();
                Dictionary<string, object> responseData = new Dictionary<string, object>();
                responseData.Add("accessToken", Token);
                string jsonString = JsonConvert.SerializeObject(responseData);
                response.ContentType = "application/json";
                // Write the JSON string to the OutputStream of the response object
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(jsonString);
                response.ContentLength64 = buffer.Length;
                var responseOutput = response.OutputStream;
                await responseOutput.WriteAsync(buffer, 0, buffer.Length);
                responseOutput.Close();
                response.Headers.Add("Location", "/user");
                return;
            }
        }

        private static async Task HandleRegisterRequest(HttpListenerRequest request, HttpListenerResponse response, IMongoCollection<BsonDocument> collection)
        {
            // Read the request body
            using (var requestStream = request.InputStream)
            using (var reader = new StreamReader(requestStream))
            {
                var requestBody = await reader.ReadToEndAsync();

                // Parse the request data
                Console.WriteLine(requestBody);
                var data = BsonSerializer.Deserialize<RegisterRequest>(requestBody);

                // Check if the username is already taken
                var user = collection.Find(u => u["Username"] == data.Username).FirstOrDefault();
                if (user != null)
                {
                    // Return a conflict response if the username is already taken
                    response.StatusCode = (int)HttpStatusCode.Conflict;
                    var responseString = "username taken";
                    var buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
                    response.ContentLength64 = buffer.Length;
                    var responseOutput = response.OutputStream;
                    await responseOutput.WriteAsync(buffer, 0, buffer.Length);
                    responseOutput.Close();
                    Console.WriteLine("username taken");
                    return;
                } else
                {
                    Console.WriteLine("user not found", data.Password);
                    // Insert the new user into the database
                    var newUser = new BsonDocument { { "Username", data.Username }, { "Password", data.Password } };
                    await collection.InsertOneAsync(newUser);
                    Console.WriteLine("created user ", newUser);
                    // Return a 201 Created response with the new user id
                    response.StatusCode = (int)HttpStatusCode.Created;
                    response.Headers.Add("Location", $"/api/users/{newUser["_id"]}");
                }

            }
        }

    }
}

