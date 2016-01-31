using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;

namespace Logging_WebApi.Tests.Controllers
{
    [TestClass]
    public class AccountController
    {
        [TestMethod]
        public void TestMethod1()
        {
            AccountController controller = new AccountController(Repository);

            controller.Request = new HttpRequestMessage
            {
                RequestUri = new Uri("http://localhost/api/products")
            };
        }
    }
}
