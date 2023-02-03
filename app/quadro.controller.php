<?php
    date_default_timezone_set ("America/Sao_Paulo");

    require 'bloco.model.php';
    require 'conexao.php';
    require 'quadro.service.php';
    
    $acao = isset($_GET['acao']) ? $_GET['acao'] : $acao;
    $dia = isset($_GET['dia']) ? $_GET['dia'] : date('Y-m-d');

    if($acao == 'inserir') { # INSERIR

        $conexao = new Conexao();
        $bloco = new Bloco();

        $bloco
            ->__set('titulo', $_POST['titulo'])
            ->__set('tempo', $_POST['tempo'])
            ->__set('descricao', $_POST['descricao'])
            ->__set('dataCriacao', $dia);
        $bloco
            ->setRevisao(
            $_POST['revisao_1'],
            $_POST['revisao_7'],
            $_POST['revisao_30'],
            $_POST['revisao_60']);

        $quadroService = new QuadroService($conexao, $bloco);
        $quadroService->inserir();
        $quadroService->inserirRevisoes();  

        header('Location: ../index.php');

    } else if($acao == 'recuperar') { # RECUPERAR

        $bloco = new Bloco();
        $bloco->__set('dataCriacao', $dia);
        $conexao = new Conexao();

        $quadroService = new QuadroService($conexao, $bloco);
        $Todosblocos = $quadroService->recuperar();

    } else if($acao == 'atualizar') { #ATUALIZAR

        $bloco = new Bloco();
        $bloco->__set('id', $_GET['id'])
              ->__set('titulo', $_POST['titulo'])
              ->__set('tempo', $_POST['tempo'])
              ->__set('descricao', $_POST['descricao']);

        $bloco
              ->setRevisao(
              $_POST['revisao_1'],
              $_POST['revisao_7'],
              $_POST['revisao_30'],
              $_POST['revisao_60']);

        $conexao = new Conexao();
        
        $quadroService = new QuadroService($conexao, $bloco);
        $quadroService->atualizar();

        header('Location: ../index.php');

    } else if($acao == 'remover') { #REMOVER

        $bloco = new Bloco();
        $bloco->__set('id', $_GET['id']);

        $conexao = new Conexao();

        $quadroService = new QuadroService($conexao, $bloco);
        $quadroService->remover();

        header('Location: ../index.php');
    } else if ($acao == 'removerRevisao') {
        $bloco = new Bloco();
        $bloco->__set('id', $_GET['id']);

        $conexao = new Conexao();

        $quadroService = new QuadroService($conexao, $bloco);
        $quadroService->removerRevisao();

        header('Location: ../index.php');
    }

    $bloco = new Bloco();
    $conexao = new Conexao();

    $quadroService = new QuadroService($conexao, $bloco);
    $dias = $quadroService->RecuperarDatas();

?>