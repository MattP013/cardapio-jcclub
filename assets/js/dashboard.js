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
      return element.id == Id
    })
    
    $(".descricao").text(Produto.descricao)

  }
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



  $(".fa-edit").click(function (e) {
    const produto = $(this).parents("tr").find("th").text();
    ProductById(produto)
  });

  $(".fa-times-circle").click(function (e) {
    $(this).parents("tr").remove();
  });


});
