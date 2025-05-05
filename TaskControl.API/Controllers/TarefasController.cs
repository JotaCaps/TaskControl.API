using Microsoft.AspNetCore.Mvc;
using TaskControl.Application.Models;
using TaskControl.Application.Services;
using TaskControl.Domain.Enums;
using TaskControl.Infrastructure;

namespace TaskControl.Presentation.Controllers
{
    [ApiController]
    [Route("api/tarefas")]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaService _service;

        public TarefasController(TaskControlDbContext context, ITarefaService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Post(RegisterTaskInputModel model)
        {
            _service.Create(model);
            return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tasks = _service.GetAll();
            return Ok(tasks);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _service.GetById(id);
            if(!result.IsSuccess)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("status/{status}")]
        public IActionResult GetByStatus(Status status)
        {
            var result = _service.GetByStatus(status);
            if (!result.IsSuccess)
                return NotFound(result.Message);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, RegisterTaskInputModel model)
        {
            var result = _service.Update(id, model);
            if (!result.IsSuccess)
                return NotFound();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _service.Delete(id);

            if (!result.IsSuccess)
                return NotFound();

            return NoContent();
        }
    }
}
