using TaskControl.Application.Models;
using TaskControl.Domain.Enums;
using TaskControl.Infrastructure;

namespace TaskControl.Application.Services
{
    public class TarefaService : ITarefaService
    {
        private readonly TaskControlDbContext _context;

        public TarefaService(TaskControlDbContext context)
        {
            _context = context;
        }

        public ResultViewModel<int> Create(RegisterTaskInputModel model)
        {
            var tarefa = model.ToEntity();

            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();

            return ResultViewModel<int>.Succcess(tarefa.Id);
        }

        public ResultViewModel<List<GetAllTasksViewModel>> GetAll()
        {
            var tarefas =  _context.Tarefas.ToList();
            var model = tarefas.Select(GetAllTasksViewModel.FromEntity).ToList();

            return ResultViewModel<List<GetAllTasksViewModel>>.Succcess(model);
        }

        public ResultViewModel<GetTaskByIdViewModel> GetById(int id)

        {
            var tarefa = _context.Tarefas.SingleOrDefault(t => t.Id == id);

            if (tarefa is null)
            {
                return ResultViewModel<GetTaskByIdViewModel>.Error("Essa tarefa não existe");
            }

            var model = GetTaskByIdViewModel.FromEntity(tarefa);

            return ResultViewModel<GetTaskByIdViewModel>.Succcess(model);
        }

        public ResultViewModel<List<GetAllTasksViewModel>> GetByStatus(Status status)
        {
            var tarefas = _context.Tarefas.Where(t => t.Status == status);
            var model = tarefas.Select(GetAllTasksViewModel.FromEntity).ToList();

            if (!tarefas.Any())
                return ResultViewModel<List<GetAllTasksViewModel>>.Error("Nenhuma tarefa encontrada com o status: " + status);

            return ResultViewModel<List<GetAllTasksViewModel>>.Succcess(model);
        }

        public ResultViewModel Update(int id, RegisterTaskInputModel model)
        {
            var tarefa = _context.Tarefas.SingleOrDefault(t => t.Id == id);

            if (tarefa is null)
            {
                return ResultViewModel.Error("Essa tarefa não existe");
            }

            tarefa.Update(model.Titulo, model.Descricao, model.Status, model.DataDeConclusao);

            _context.Tarefas.Update(tarefa);
            _context.SaveChanges();

            return ResultViewModel.Succcess();
        }

        public ResultViewModel Delete(int id)
        {
            var tarefa = _context.Tarefas.SingleOrDefault(t => t.Id == id);

            if (tarefa is null)
            {
                return ResultViewModel.Error("Essa tarefa não existe");
            }

            _context.Tarefas.Remove(tarefa);
            _context.SaveChanges();

            return ResultViewModel.Succcess();
        }
    }
}
