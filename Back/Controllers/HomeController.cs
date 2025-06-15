using Microsoft.AspNetCore.Mvc;

namespace ControleDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // GET: api/Home
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(new
            {
                status = "API rodando",
                versao = "1.0",
                descricao = "API Controle de Projetos"
            });
        }

        // GET: api/Home/privacy
        [HttpGet("privacy")]
        public IActionResult Privacy()
        {
            return Ok(new
            {
                mensagem = "Nenhuma informação pessoal é armazenada pela API."
            });
        }

        // GET: api/Home/error
        [HttpGet("error")]
        public IActionResult Error()
        {
            return Problem("Ocorreu um erro interno na API.");
        }
    }
}
