using TaskControl.Domain.Entities;
using TaskControl.Domain.Enums;

namespace TaskControl.Application.Models
{
    public class GetTaskByIdViewModel
    {
        public GetTaskByIdViewModel(string titulo, DateTime dataDeCriacao, Status status)
        {
            Titulo = titulo;
            DataDeCriacao = dataDeCriacao;
            Status = status;
        }

        public int Id { get; set; }
        public string Titulo { get; set; }
        public string? Descricao { get; set; }
        public DateTime DataDeCriacao { get; set; }
        public DateTime? DataDeConclusao { get; set; }
        public Status Status { get; set; }

        public static GetTaskByIdViewModel FromEntity(Tarefa entity)
    => new GetTaskByIdViewModel(entity.Titulo, entity.DataDeCriacao, entity.Status)
    {
        Id = entity.Id,
        Descricao = entity.Descricao,
        DataDeConclusao = entity.DataDeConclusao
    };

    }
}
