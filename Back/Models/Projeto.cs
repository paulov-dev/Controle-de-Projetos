using Controle_de_Projetos.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleDeProjetos.Models
{
    public class Projeto
    {
        [Key]
        public int ProjetoId { get; set; }

        [Required(ErrorMessage = "Nome do projeto é obrigatório")]
        [StringLength(150)]
        public string Nome { get; set; }

        [StringLength(300)]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "Selecione um cliente")]
        public int ClienteId { get; set; }
        [ForeignKey("ClienteId")]
        public virtual Cliente? Cliente { get; set; }

        // Relacionamento com Tarefa: 1 Projeto -> N Tarefas
        public virtual ICollection<Tarefa>? Tarefas { get; set; }
    }
}
