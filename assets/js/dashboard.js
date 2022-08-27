$(document).ready(function () {
  const Produtos = [
    {
      id: 1,
      nome: "Café Expresso",
      categoria: "Bebida Quentes",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 2,
      nome: "Capuccino",
      categoria: "Bebida Quentes",
      preco: 28.9,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 3,
      nome: "Café Americano",
      categoria: "Bebida Quentes",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 4,
      nome: "Café com Leite",
      categoria: "Bebida Quentes",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
  ];

  function ProductById(Id) {
    const Produto = Produtos.find((element) => {
      return element.id == Id;
    });

    const src = window.location.origin;
    let inputs = $('.updateProduct').find('input')
    let textarea = $('.updateProduct').find('textarea')

    $(inputs[1]).val(Produto.nome);
    $(inputs[2]).val(Produto.preco);
    $(inputs[3]).val(Produto.categoria);
    $(textarea).val(Produto.descricao);
   
    $("#product-img").attr("src", `${src}/assets/img/${Produto.img}`);
  }
   



  $("input[type='file']").on('change', function (){
    if(this.files && this.files[0])
    {
      let file = new FileReader();
      file.onload = function (e){
        $(".product-image").find('img').attr("src", e.target.result);
      }
      file.readAsDataURL(this.files[0])
    }
  })


  const Table = $(".produtos").children("tbody");

  function LoadTable(Produtos, Table) {
    let TableData = [];
    const retorno = Produtos.forEach((element) => {
      TableData.push(`
            <tr>
            <th scope="row">${element.id}</th>
            <td>${element.nome}</td>
            <td>${Intl.NumberFormat("pt-br", {
              minimumFractionDigits: 2,
            }).format(element.preco)}</td>
            <td>${element.qtd}</td>
            <td class="d-md-block d-none">
              <i
                class="fas fa-edit mx-lg-2"
                data-bs-toggle="modal"
                data-bs-target="#UpdadeProduct"
              ></i>
              <i class="fas fa-times-circle"></i>
            </td>
            <td class="d-md-none d-flex">...</td>
          </tr>`);
    });

    Table.html(TableData);
  }

  LoadTable(Produtos, Table);

  var option = $('option')
  var input = [$('#categoria_editar'), $('#categoria_adicionar')]
  var categorias = [$('#categorias_editar'),$('#categorias_adicionar')]

  $(".fa-edit").click(function (e) {
    const produto = $(this).parents("tr").find("th").text();
    ProductById(produto);
  });

  $(".fa-times-circle").click(function (e) {
    $(this).parents("tr").remove();
  });


  $(input[0]).on("focus", function () {
    $(this).next().css("display", "block");
    $(this).css("border-radius", "5px 5px 0 0");
  });

  $(input[0]).on("input", function () {
    var text = $(this).val().toUpperCase();
    
    for (let element of option) {
      if ($(element).val().toUpperCase().indexOf(text) > -1) {
        $(element).css("display", "block");
      } else {
        $(element).css("display", "none");
      }
    }
  });

  $(input[1]).on("focus", function () {
    $(this).next().css("display", "block");
    $(this).css("border-radius", "5px 5px 0 0");
  });

 

  $(input[1]).on("input", function () {
    var text = $(this).val().toUpperCase();
    
    for (let element of option) {
      if ($(element).val().toUpperCase().indexOf(text) > -1) {
        $(element).css("display", "block");
      } else {
        $(element).css("display", "none");
      }
    }
  });

  $(option).click(function () {
    
    if ($(this).parents('datalist').attr('id') == categorias[0].attr('id')) {
        input[0].val($(this).val())
        categorias[0].css("display","none")
        input[0].css("border-radius", "5px")
    }
    else
    {
      input[1].val($(this).val())
      categorias[1].css("display","none")
      input[1].css("border-radius", "5px")
    }
  });
});
