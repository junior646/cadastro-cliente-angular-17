import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from '../../models/ClienteModel';
import { MenuService } from '../../services/menu.service';
import { ClienteService } from '../../services/cliente.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public clienteService: ClienteService) {
  }
  
  itemEdicao: ClienteModel = new ClienteModel;
  ClienteForm: any ;
  checked = false;
  gerarCopiaDespesa = 'accent';
  disabled = false;

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListClientes: Array<ClienteModel> = [];
  id: string = "";

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.ClienteForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  ListarClientes() {
    this.itemEdicao = new ClienteModel;
    this.tipoTela = 1;

    this.clienteService.Listar()
    .subscribe({
      next: (value:any ) => this.tableListClientes.push(value),
      error: (err) => console.error(err)
    })
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 5;

    this.configpag();
    this.ListarClientes();

    this.ClienteForm = this.formBuilder.group
    (
      {
        Nome: ['', [Validators.required]],
        CPF: ['', [Validators.required]],
        DataNascimento: ['', [Validators.required]],
        Renda: ['', [Validators.required]],
      }
    )
  }

  dadorForm() {
    return this.ClienteForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    if (this.itemEdicao) {

      this.itemEdicao.Id = dados["Id"].value;
      this.itemEdicao.CPF = dados["CPF"].value;
      this.itemEdicao.Nome = dados["Nome"].value;
      this.itemEdicao.DataNascimento = dados["DataNascimento"].value;
      this.itemEdicao.Renda = dados["Renda"].value;
      
      this.clienteService.Atualizar(this.itemEdicao.Id,
                                 this.itemEdicao.Nome,
                                 this.itemEdicao.CPF,
                                 Date.parse(this.itemEdicao.DataNascimento),
                                 this.itemEdicao.Renda)
        .subscribe((response: ClienteModel) => {

          this.ClienteForm.reset();
          this.ListarClientes();

        }, (error) => console.error(error),
          () => { })


    }
    else {

      let item = new ClienteModel();
      item.Id = "";
      item.Nome = dados["Nome"].value;
      item.CPF = dados["CPF"].value;
      item.DataNascimento = dados["DataNascimento"].value;
    
      this.clienteService.Cadastrar(
        item.Nome,
        item.CPF,
        Date.parse(item.DataNascimento),
        item.Renda)
        .subscribe((response: ClienteModel) => {

          this.ClienteForm.reset();
              this.ListarClientes();        

        }, (error) => console.error(error),
          () => { })
    }
  }

  edicao(item: ClienteModel) {

    this.itemEdicao = item;
    this.tipoTela = 2;

    var dados = this.dadorForm();
    dados["CPF"].setValue(this.itemEdicao.CPF);
    dados["Nome"].setValue(this.itemEdicao.Nome);
    dados["DataNascimento"].setValue(this.itemEdicao.DataNascimento);
    dados["Renda"].setValue(this.itemEdicao.Renda);
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  nomeCliente: string = "";
  nomeClienteValid: boolean = true;
  textValid: string = "Campo Obrigatório!";

  excluir(id: string) {
    this.clienteService.Deletar(id)
    .subscribe({
      next: (value) => {
        if (value) {
            this.edicao(this.itemEdicao)
            this.nomeCliente = "";
          }
      },
      error: (err) => console.error(err),
    })
  }

  addClientes() {
    this.nomeClienteValid = true;

    if (!this.nomeCliente) {
      this.nomeClienteValid = false;
    }
    else {

      this.clienteService.Cadastrar(this.nomeCliente, "12345678909", 0, 0)
        .subscribe({
          next: (value : any) =>{

            if (value) {
              this.edicao(this.itemEdicao)
              this.nomeCliente = "";
            }
          },
          error: (err) => console.error(err),
        })
      }
    }
}