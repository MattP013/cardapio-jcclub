$(document).ready(function () {
  const Produtos = [
    {
      id: 1,
      nome: "Café Expresso",
      categoria: "Bebidas",
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
      categoria: "Bebidas",
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
      categoria: "Bebidas",
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
      categoria: "Bebidas",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 5,
      nome: "Pão de mel de brigadeiro",
      categoria: "Snacks",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 6,
      nome: "Pão de mel",
      categoria: "Snacks",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
    {
      id: 7,
      nome: "A",
      categoria: "Snacks",
      preco: 14.0,
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illo eligendi.",
      img: "logo-jc.jpg",
      qtd: 1,
      novopreco: 0,
    },
  ];

  var option = $("option");
  var input = [$("#categoria_editar"), $("#categoria_adicionar")];
  var categorias = [$("#categorias_editar"), $("#categorias_adicionar")];
  var edit = $(".fa-edit");
  function ProductById(Id) {
    const Produto = Produtos.find((element) => {
      return element.id == Id;
    });

    const src = window.location.origin;
    let inputs = $(".updateProduct").find("input");
    let textarea = $(".updateProduct").find("textarea");

    $(inputs[1]).val(Produto.nome);
    $(inputs[2]).val(Produto.preco);
    $(inputs[3]).val(Produto.categoria);
    $(textarea).val(Produto.descricao);

    $("#product-img").attr("src", `${src}/assets/img/${Produto.img}`);
  }

  $("input[type='file']").on("change", function () {
    const testImage = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    console.log($(this).val());
    if (testImage.exec($(this).val())) {
      if (this.files && this.files[0]) {
        let file = new FileReader();
        file.onload = function (e) {
          $(".product-image").find("img").attr("src", e.target.result);
        };
        file.readAsDataURL(this.files[0]);
      }
    }
    else
    {
      alert("Extensão de arquivo invalida")
    }
    
  });

  const Table = $(".produtos");

  function LoadTable(Produtos, Table) {
    let TableData = [];
    Tbody = $(Table).children("tbody");
    const retorno = Produtos.forEach((element) => {
      TableData.push(`
            <tr>
            <th scope="row">${element.id}</th>
            <td>${element.nome}</td>
            <td>${Intl.NumberFormat("pt-br", {
              minimumFractionDigits: 2,
            }).format(element.preco)}</td>
            <td>${element.qtd}</td>
            <td class="d-flex justify-content-lg-center justify-content-around">
              <i
                class="fas fa-edit mx-lg-2"
                data-id="${element.id}"
                data-bs-toggle="modal"
                data-bs-target="#UpdadeProduct"
              ></i>
              <i class="fas fa-times-circle d-md-block d-none"></i>
            </td>
          </tr>`);
    });
    Tbody.html(TableData);
  }

  // LoadTable(Produtos, Table);

  $("#search-input").on("input", function () {
    const tablerow = $("tbody").find("tr");
    const search = $(this).val().toUpperCase();
    if ($(this).val().length) {
      for (let produto of tablerow) {
        const produtoAtual = $(produto).children("td");

        if (produtoAtual[0].textContent.toUpperCase().indexOf(search) > -1) {
        } else {
          $(produto).css("display", "none");
        }
      }
    } else {
      tablerow.css("display", "table-row");
      $("#Bycategoria").val("0")

    }
  });

  $(".btn-filter").click(function () {
    $(".filter").fadeToggle();
  });

  $(".fa-edit").click(function (e) {
    const produto = $(this).parents("tr").find("th").text();
    ProductById(produto);
  });

  $(".menor-preco").click(function () {
    SortbyPrice(true);
  });
  $(".maior-preco").click(function () {
    SortbyPrice(false);
  });

  $(".ordem-alfabetica").click(function () {
    if ($(".fa-sort-alpha-up").hasClass("d-none")) {
      $(".fa-sort-alpha-down-alt").addClass("d-none");
      $(".fa-sort-alpha-up").removeClass("d-none");
      SortbyName(false);
    } else {
      $(".fa-sort-alpha-down-alt").removeClass("d-none");
      $(".fa-sort-alpha-up").addClass("d-none");
      SortbyName(true);
    }
  });

  function SortbyPrice(asc) {
    const modifier = asc ? 1 : -1;
    const rows = $(Table).children("tbody").find("tr");
    rows.css("display", "")
    const tbody = $(Table).children("tbody");
    const sortedRows = rows.sort((a, b) => {
      const aColText = $(a).find("td")[1].textContent;
      const bColText = $(b).find("td")[1].textContent;
      return aColText > bColText ? 1 * modifier : -1 * modifier;
    });

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    $(tbody).append(sortedRows);
  }

  function SortbyName(asc) {
    const modifier = asc ? 1 : -1;
    const rows = $(Table).children("tbody").find("tr");
    rows.css("display", "")
    const tbody = $(Table).children("tbody");
    const sortedRows = rows.sort((a, b) => {
      const aColText = $(a).find("td")[0].textContent;
      const bColText = $(b).find("td")[0].textContent;

      return aColText > bColText ? 1 * modifier : -1 * modifier;
    });

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    $(tbody).append(...sortedRows);
  }

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

  $("#Bycategoria").on("change", function () {
    const Categoria = $(this).val();
    const tablerow = $("tbody").find("tr")
    tablerow.css("display", "");
    if (Categoria != 0) {
      let Arr = [];
      const productCategory = Produtos.filter((P) => {
        if (P.categoria == Categoria) {
          Arr.push(P.id);
        }
      });
      let i = 0
      for (let row of tablerow) {
        if (Arr[i] != $(row).children("th").eq(0).text()) 
        {
          $(row).css("display","none")          
        }
        else
        {      
          i++
        }
          
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
    if ($(this).parents("datalist").attr("id") == categorias[0].attr("id")) {
      input[0].val($(this).val());
      categorias[0].css("display", "none");
      input[0].css("border-radius", "5px");
    } else {
      input[1].val($(this).val());
      categorias[1].css("display", "none");
      input[1].css("border-radius", "5px");
    }
  });
});
