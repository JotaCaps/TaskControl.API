using TaskControl.Domain.Enums;

namespace TaskControl.Domain.Entities
{
    public class Tarefa
    {
        public Tarefa() { }

        public Tarefa(string titulo, DateTime dataDeCriacao, Status status, string? descricao = null,DateTime? dataDeConclusao = null)
        {
            Titulo = titulo;
            Descricao = descricao;
            DataDeCriacao = dataDeCriacao;
            DataDeConclusao = dataDeConclusao;
            Status = status;
        }

        public int Id { get; private set; }
        public string Titulo { get; private set; }
        public string? Descricao { get; private set; }
        public DateTime DataDeCriacao { get; private set; }
        public DateTime? DataDeConclusao { get; private set; }
        public Status Status { get; private set; }

        public void Update(string titulo, string? descricao, Status status, DateTime? dataDeConclusao = null)
        {
            Titulo = titulo;
            Descricao = descricao;
            Status = status;
            
            
            if (dataDeConclusao.HasValue)
            {
                DataDeConclusao = dataDeConclusao.Value;
            }
        }
    }
}
