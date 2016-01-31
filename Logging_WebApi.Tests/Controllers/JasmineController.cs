using System;
using System.Web.Mvc;

namespace Logging_WebApi.Tests.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
