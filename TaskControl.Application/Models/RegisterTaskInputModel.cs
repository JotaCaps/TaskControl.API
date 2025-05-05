using System.ComponentModel.DataAnnotations;
using TaskControl.Application.Validations;
using TaskControl.Domain.Entities;
using TaskControl.Domain.Enums;

namespace TaskControl.Application.Models
{
    public class RegisterTaskInputModel
    {
        public RegisterTaskInputModel(string titulo, DateTime dataDeCriacao, Status status)
        {
            Titulo = titulo;
            DataDeCriacao = dataDeCriacao;
            Status = status;
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres.")]
        public string Titulo { get; set; }

        [StringLength(250, ErrorMessage = "A descrição deve ter no máximo 250 caracteres.")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "A data de criação é obrigatória.")]
        public DateTime DataDeCriacao { get; set; }

        [DataConclusaoMaiorOuIgual("DataDeCriacao", ErrorMessage = "A data de conclusão não pode ser anterior à data de criação.")]
        public DateTime? DataDeConclusao { get; set; }

        [Required(ErrorMessage = "O status é obrigatório.")]
        public Status Status { get; set; }

        public Tarefa ToEntity()
            => new(Titulo, DataDeCriacao, Status, Descricao, DataDeConclusao);
    }
}
