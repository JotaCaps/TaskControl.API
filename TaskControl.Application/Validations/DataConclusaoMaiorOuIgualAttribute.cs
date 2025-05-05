using System.ComponentModel.DataAnnotations;

namespace TaskControl.Application.Validations
{
    public class DataConclusaoMaiorOuIgualAttribute : ValidationAttribute 
    {
        private readonly string _dataInicialProperty;

        public DataConclusaoMaiorOuIgualAttribute(string dataInicialProperty)
        {
            _dataInicialProperty = dataInicialProperty;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var dataFinal = value as DateTime?;

            var propriedadeDataInicial = validationContext.ObjectType.GetProperty(_dataInicialProperty);
            if (propriedadeDataInicial == null)
                return new ValidationResult($"Propriedade {_dataInicialProperty} não encontrada.");

            var dataInicial = propriedadeDataInicial.GetValue(validationContext.ObjectInstance) as DateTime?;

            if (dataInicial.HasValue && dataFinal.HasValue && dataFinal < dataInicial)
            {
                return new ValidationResult("A data de conclusão não pode ser anterior à data de criação.");
            }

            return ValidationResult.Success;
        }
    }
}
