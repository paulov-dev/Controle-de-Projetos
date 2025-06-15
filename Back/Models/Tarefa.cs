using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleDeProjetos.Models
{
    public class Tarefa
    {
        [Key]
        public int TarefaId { get; set; }

        [Required(ErrorMessage = "Título da tarefa é obrigatório")]
        [StringLength(150)]
        public string Titulo { get; set; }

        public string? Descricao { get; set; }

        [Required(ErrorMessage = "Selecione um projeto")]
        public int ProjetoId { get; set; }
        [ForeignKey("ProjetoId")]
        public virtual Projeto? Projeto { get; set; }

        public bool Concluida { get; set; } = false;
    }
}
