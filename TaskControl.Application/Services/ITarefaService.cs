using TaskControl.Application.Models;
using TaskControl.Domain.Enums;

namespace TaskControl.Application.Services
{
    public interface ITarefaService
    {
        ResultViewModel<int> Create(RegisterTaskInputModel model);
        ResultViewModel<List<GetAllTasksViewModel>> GetAll();
        ResultViewModel<GetTaskByIdViewModel> GetById(int id);
        ResultViewModel<List<GetAllTasksViewModel>> GetByStatus(Status status);
        ResultViewModel Update(int id, RegisterTaskInputModel model);
        ResultViewModel Delete(int id);
    }
}
