
function abrirModal(acao = '', id = '', titulo = '', descricao = '', tempo = '') {
    

    let fundo = document.createElement('div');
    fundo.id = 'fundo_modal';
    
    let modal = document.createElement('div');
    modal.id = 'modal';

    let form = document.createElement('form');
    form.action = acao == 'inserir' ? `app/quadro.controller.php?acao=inserir&dia=${document.querySelector('#data').value}` : `app/quadro.controller.php?acao=atualizar&id=${id}&dia=${document.querySelector('#data').value}`;
    form.method = 'post';
    form.id = 'form_modal';

    let inputTitulo = document.createElement('input');
    inputTitulo.type = 'text';
    inputTitulo.name = 'titulo';
    inputTitulo.id = 'titulo';
    inputTitulo.placeholder = 'Título';
    inputTitulo.className = 'required';
    inputTitulo.value = titulo;

    let inputTempo = document.createElement('input');
    inputTempo.type = 'text';
    inputTempo.name = 'tempo';
    inputTempo.id = 'tempo';
    inputTempo.placeholder = 'Tempo';
    inputTempo.className = 'required';
    inputTempo.value = tempo;

    let texto_input = document.createElement('div') 
    texto_input.id = 'texto_input';

    let inputDescricao = document.createElement('textarea');
    inputDescricao.name = 'descricao';
    inputDescricao.id = 'descricao'; 
    inputDescricao.cols = 30; 
    inputDescricao.rows = 10; 
    inputDescricao.placeholder = 'Anotações...'; 
    inputDescricao.style.resize = 'none'; 
    inputDescricao.value = descricao; 

    let revisao_container = document.createElement('div')
    revisao_container.id = 'revisao_container';

    let label1 = document.createElement('label')
    label1.for = 'revisao_1';
    

    let revisao1 = document.createElement('input');
    revisao1.type = 'checkbox';
    revisao1.name = 'revisao_1';
    revisao1.id = 'revisao_1';
    revisao1.value = '1';
    revisao1.className = 'revisao_marcar';

    let label7 = document.createElement('label')
    label7.for = 'revisao_7';
    
    let revisao7 = document.createElement('input');
    revisao7.type = 'checkbox';
    revisao7.name = 'revisao_7';
    revisao7.id = 'revisao_7';
    revisao7.value = '7';
    revisao7.className = 'revisao_marcar';

    let label30 = document.createElement('label')
    label30.for = 'revisao_30';
    

    let revisao30 = document.createElement('input');
    revisao30.type = 'checkbox';
    revisao30.name = 'revisao_30';
    revisao30.id = 'revisao_30';
    revisao30.value = '30';
    revisao30.className = 'revisao_marcar';

    let label60 = document.createElement('label')
    label60.for = 'revisao_60';
    
    let revisao60 = document.createElement('input');
    revisao60.type = 'checkbox';
    revisao60.name = 'revisao_60';
    revisao60.id = 'revisao_60';
    revisao60.value = '60';
    revisao60.className = 'revisao_marcar';

    let botoes = document.createElement('div')
    botoes.id = 'botoes';

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.id = 'submit'
    submit.value = acao == 'inserir' ?  'Criar' : 'Atualizar'

    let cancelar = document.createElement('button')
    cancelar.id = 'cancelar'
    cancelar.addEventListener('click', esconderModal);
    cancelar.innerHTML =  'Cancelar'

    modal.appendChild(form)
    form.appendChild(inputTitulo);
    form.appendChild(inputTempo);
    form.appendChild(texto_input);
    texto_input.appendChild(inputDescricao);
    form.appendChild(revisao_container);
    revisao_container.appendChild(label1);
    label1.appendChild(revisao1);
    label1.innerHTML += 'Amanhã';
    revisao_container.appendChild(label7);
    label7.appendChild(revisao7);
    label7.innerHTML += '7 dias';
    revisao_container.appendChild(label30);
    label30.appendChild(revisao30);
    label30.innerHTML += '30 dias';
    revisao_container.appendChild(label60);
    label60.appendChild(revisao60);
    label60.innerHTML += '60 dias';
    form.appendChild(botoes)
    botoes.appendChild(submit)
    botoes.appendChild(cancelar)
    
    let body = document.querySelector('body')
    body.insertBefore(fundo, body[0])
    body.insertBefore(modal, body[0])
}

function criar() {
    abrirModal('inserir')
}

function editar(id, titulo, tempo, descricao) {
    abrirModal('atualizar', id, titulo, tempo, descricao);
}

function esconderModal() {
    let modal = document.querySelector('#modal');
    let fundo = document.querySelector('#fundo_modal')
    modal.remove();
    fundo.remove();
}

function excluirBloco(id) {
    window.confirm('dejesa apagar esse bloco?')
    location.href = 'app/quadro.controller.php?acao=remover&id='+id;
}

function excluirRevisao(id) {
    window.confirm('dejesa apagar essa revisao?')
    location.href = 'app/quadro.controller.php?acao=removerRevisao&id='+id;

}