using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TarefandoAPI.Models
{
    public class Atividade
    {

        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Titulo { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Descricao { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime DataConclucao { get; set; }
    }
}
