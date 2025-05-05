using TaskControl.Domain.Entities;
using TaskControl.Domain.Enums;

namespace TaskControl.Application.Models
{
    public class GetAllTasksViewModel
    {
        public GetAllTasksViewModel(int id, string titulo, Status status)
        {
            Id = id;
            Titulo = titulo;
            Status = status;
        }

        public int Id { get; private set; }
        public string Titulo { get; private set; }
        public Status Status { get; private set; }

        public static GetAllTasksViewModel FromEntity(Tarefa entity)
        => new(entity.Id, entity.Titulo, entity.Status);
        
        
    }
}
